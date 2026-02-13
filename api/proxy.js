
// Vercel Serverless Function (Node.js)
export default async function handler(req, res) {
  // CORS 처리
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { targetUrl, method = 'GET', body, cookie } = req.body;

  if (!targetUrl) {
    return res.status(400).json({ error: 'Target URL is required' });
  }

  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        // 브라우저가 못 보내는 Cookie 헤더를 여기서 대신 설정
        'Cookie': cookie || '',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
      }
    };

    if (method !== 'GET' && method !== 'HEAD' && body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(targetUrl, options);
    
    // 응답이 JSON이 아닐 경우를 대비해 text로 먼저 받음
    const responseText = await response.text();
    
    try {
        const data = JSON.parse(responseText);
        return res.status(response.status).json(data);
    } catch (e) {
        // JSON 파싱 실패 시 텍스트 에러 반환
        console.error("Non-JSON response:", responseText);
        return res.status(response.status).json({ 
            error: 'Server returned non-JSON response', 
            details: responseText 
        });
    }

  } catch (error) {
    console.error('Proxy Error:', error);
    return res.status(500).json({ error: 'Proxy request failed', details: error.message });
  }
}
