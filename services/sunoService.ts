
// Suno API Service
// Unofficial Suno API Wrapper와 통신하기 위한 서비스입니다.

// ==========================================
// [설정] API 대상 URL 및 쿠키
// ==========================================
const CONFIG = {
  // 실제 API 서버 주소 (직접 호출하지 않고 프록시를 통해 호출함)
  TARGET_BASE_URL: 'https://suno-api-ejfv.onrender.com', 
  // Suno 계정 인증용 쿠키 (만료 시 갱신 필요)
  COOKIE: '_ga=GA1.1.1565055388.1732499053; ajs_anonymous_id=45bc27d5-c476-4b3b-8c02-f172424b77a5; _fbp=fb.1.1733447092957.745965835635917587; _tt_enable_cookie=1; _ttp=5bQWfqxDb-9W2b3XeI8EHhk65Dg.tt.1; __stripe_mid=dcd6c557-49f0-4675-800a-0456d1afd4c0fa8c08; afUserId=582e93cb-25db-4b9a-b0bc-f2c41d398e43-p; singular_device_id=f3c84740-fca1-4c7c-bea9-f6785a8368ab; _axwrt=d9c23f82-fad3-463b-a7a2-fee48add50e0; _scid=VtIgp0z3taGopdGYtq2Mf1zn7CnK7Zws; __client_uat_U9tcbTPE=1763713570; _gcl_au=1.1.671849443.1766537464.845126027.1766563342.1766564393; _gcl_gs=2.1.k1$i1767946559$u42332455; __client_uat=1768546212; __client_uat_Jnxw-muT=1768546212; __session=eyJhbGciOiJSUzI1NiIsImtpZCI6InN1bm8tYXBpLXJzMjU2LWtleS0xIiwidHlwIjoiSldUIn0.eyJzdW5vLmNvbS9jbGFpbXMvY2xlcmtfaWQiOiJ1c2VyXzJ5Y3NHQmh5azFBU2JpTzdKeWYwT1ZoRmpsaiIsInN1bm8uY29tL2NsYWltcy90b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzcwODgzNjY4LCJhdWQiOiJzdW5vLWFwaSIsInN1YiI6InVzZXJfMnljc0dCaHlrMUFTYmlPN0p5ZjBPVmhGamxqIiwiYXpwIjoiaHR0cHM6Ly9zdW5vLmNvbSIsImZ2YSI6WzAsLTFdLCJpYXQiOjE3NzA4ODAwNjgsImlzcyI6Imh0dHBzOi8vYXV0aC5zdW5vLmNvbSIsImppdCI6IjIxOWJkYTYwLWVjZDItNDIwNS1iYTI2LTQ3YTcyNTZmNjQwYiIsInZpeiI6ZmFsc2UsInN1bm8uY29tL2NsYWltcy9lbWFpbCI6ImNodXBpbjEyOUBuYXZlci5jb20iLCJodHRwczovL3N1bm8uYWkvY2xhaW1zL2VtYWlsIjoiY2h1cGluMTI5QG5hdmVyLmNvbSJ9.JKyovKhSBJZM8mkYXdGEqOHpjtqeGjPW9AMHCUQHkm1CVWWuQ3fFvmKgjoZPTx8YykRax-NYG1jrGtGXfd_z_p8f4nxv8WdH_J1_YrP1HYR49eRpyh9nGY7-Q3qFpl27vA9-HGmCLbOZzyzM5iJAHAvpldN9X5rkEJHQ0em0uvFYf8x4gByzwMiKy4oAJ93C-grmK_4OV-NfocxhruAGtbGWT7iW92AVFQ6mjcsRGyjH-2ws8gRCxsABmUlaoHuUc3CkP5rPe0HCI0m_KFO5Ap79GNoMA5C0JkNjGRFfTAmuqRhNuV_9qFdU8Nm_T6hit8yF43cYU2TqczxIkoWBzA; IR_gbd=suno.com; t-ip=1; _sp_ses.e685=*; _ScCbts=%5B%5D; ab.storage.deviceId.b67099e5-3183-4de8-8f8f-fdea9ac93d15=g%3A2a621094-a105-49ec-a590-fdd3077f8f09%7Ce%3Aundefined%7Cc%3A1767935450436%7Cl%3A1770880069746; ab.storage.userId.b67099e5-3183-4de8-8f8f-fdea9ac93d15=g%3A896d6528-0962-4f7c-9220-63652b86ed2a%7Ce%3Aundefined%7Cc%3A1767935451963%7Cl%3A1770880069747; _sctr=1%7C1770822000000; _clck=1y82krl%5E2%5Eg3i%5E0%5E2063; __stripe_sid=625f855c-b526-4477-86a3-acf36d7a47171ddb8f; _uetsid=8a45753007e111f1b1c867a628fc44e6|1bw4u3t|2|g3i|0|2234; __client=eyJhbGciOiJSUzI1NiIsImtpZCI6InN1bm8tYXBpLXJzMjU2LWtleS0xIiwidHlwIjoiSldUIn0.eyJzdW5vLmNvbS9jbGFpbXMvY2xlcmtfaWQiOiJ1c2VyXzJ5Y3NHQmh5azFBU2JpTzdKeWYwT1ZoRmpsaiIsInN1bm8uY29tL2NsYWltcy90b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzcwODgzNjY4LCJhdWQiOiJzdW5vLWFwaSIsInN1YiI6InVzZXJfMnljc0dCaHlrMUFTYmlPN0p5ZjBPVmhGamxqIiwiYXpwIjoiaHR0cHM6Ly9zdW5vLmNvbSIsImZ2YSI6WzAsLTFdLCJpYXQiOjE3NzA4ODAwNjgsImlzcyI6Imh0dHBzOi8vYXV0aC5zdW5vLmNvbSIsImppdCI6IjIxOWJkYTYwLWVjZDItNDIwNS1iYTI2LTQ3YTcyNTZmNjQwYiIsInZpeiI6ZmFsc2UsInN1bm8uY29tL2NsYWltcy9lbWFpbCI6ImNodXBpbjEyOUBuYXZlci5jb20iLCJodHRwczovL3N1bm8uYWkvY2xhaW1zL2VtYWlsIjoiY2h1cGluMTI5QG5hdmVyLmNvbSJ9.UodXMxMbbMAjGP282K7kEvjlYiFuESfODsUgMXlQfaTAHbeJFPpVrJ2VZoXzkjG22L-EpVyL2_WVEK4RZcWzXj8K3lqyEVf22XOaRi3Z4yme6Vzxyh5rOYxjIdxNcGY7SOcnLMrxMfbpuJY6BvboDNVsGcu4wVohCi3YCxZjL43xxkn9-Al9w8wCqCXeM29baJCR4_Ngv_HvoWGwE3SKQ3pfYWxLXzrdCpmfUnNLuw79pEd9vVZuilfNT4_hDL1bXxHGrjYZ5ido5wmTlU9GGJigtzehNJQcdgVXm6_c2wCdbqUlAoOssQSl3p_u9SmBTX8qqT7EX31SqM7i0jHaTQ; ttcsid=1770880069111::kvKRHtFodcvXc83_y8cY.153.1770880091280.0; ttcsid_CT67HURC77UB52N3JFBG=1770880069110::tZPZvEN0mrkS2QOu3EGI.16.1770880091280.1; _uetvid=65fd2ce0816311f08416fd0a1cb684c3|1bye8re|1770880091571|2|1|bat.bing.com/p/conversions/c/b; ab.storage.sessionId.b67099e5-3183-4de8-8f8f-fdea9ac93d15=g%3A7fdccc13-634b-4754-a87e-15e936fbea38%7Ce%3A1770881891913%7Cc%3A1770880069745%7Cl%3A1770880091913; _clsk=1n6bsfm%5E1770880092196%5E2%5E0%5Eb.clarity.ms%2Fcollect; ax_visitor=%7B%22firstVisitTs%22%3A1750071145685%2C%22lastVisitTs%22%3A1769759131481%2C%22currentVisitStartTs%22%3A1770880068906%2C%22ts%22%3A1770880151897%2C%22visitCount%22%3A134%7D; _ga_7B0KEDD7XP=GS2.1.s1770880068$o197$g1$t1770880152$j60$l0$h0$dGUrw9qlh2wVz62dvYXc3ePtyTpyqyUCVuQ; _scid_r=ZVIgp0z3taGopdGYtq2Mf1zn7CnK7ZwscZWZ4Q; tatari-session-cookie=f2ead32d-4200-ad27-d55f-2e2516c3ec7d; IR_46384=1770880152989%7C0%7C1770880152989%7C%7C; _sp_id.e685=53f40516-0ae1-48f7-a077-85aa1bcf7ff8.1760057168.56.1770880153.1769760254.2ab82b3a-4bd3-4f32-88a5-3e87ff7af385.8237bda6-f777-4669-81dc-91ca0fa6f25b.a256b556-052c-47a2-aa92-3ebb0b0bdaaf.1770880069146.4' 
};

export interface SunoGenerationResponse {
  id: string;
  status: 'submitted' | 'queueing' | 'processing' | 'complete' | 'error';
  audio_url?: string;
  image_url?: string;
  title?: string;
  duration?: number;
  error?: string;
}

// 프록시 API를 통해 요청을 보냅니다.
const callProxy = async (targetUrl: string, method: string, body?: any) => {
  const proxyUrl = '/api/proxy'; // Vercel Serverless Function

  const response = await fetch(proxyUrl, {
    method: 'POST', // 프록시에는 항상 POST로 데이터 전달
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      targetUrl,
      method,
      body,
      cookie: CONFIG.COOKIE // 쿠키를 바디에 담아서 프록시로 전달
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || errorData.details || `Proxy Error ${response.status}`);
  }

  return await response.json();
};

// 커스텀 모드(가사 + 스타일)로 음악 생성 요청
export const generateMusic = async (
  styleTags: string, 
  lyrics: string, 
  title: string
): Promise<string> => {
  console.log(`[Suno API] Requesting generation...`);

  try {
    const targetUrl = `${CONFIG.TARGET_BASE_URL}/api/custom_generate`;
    
    // 프록시 호출
    const data = await callProxy(targetUrl, 'POST', {
      prompt: lyrics,
      tags: styleTags,
      title: title,
      make_instrumental: false,
      wait_audio: false
    });

    const tasks = Array.isArray(data) ? data : [data];
    const taskId = tasks[0]?.id;

    if (!taskId) throw new Error("No Task ID returned from API");

    return taskId;

  } catch (error: any) {
    console.error("Suno API 호출 에러:", error);
    throw error;
  }
};

// 상태 확인 (Polling)
export const checkGenerationStatus = async (taskId: string): Promise<SunoGenerationResponse> => {
  try {
    const targetUrl = `${CONFIG.TARGET_BASE_URL}/api/get?ids=${taskId}`;

    // GET 요청도 프록시를 통해 수행 (쿠키 헤더 전송을 위해)
    const data = await callProxy(targetUrl, 'GET');
    
    const task = Array.isArray(data) ? data[0] : data;

    if (!task) throw new Error("Task not found");

    let mappedStatus: SunoGenerationResponse['status'] = 'processing';
    if (task.status === 'complete' || task.status === 'succeeded') mappedStatus = 'complete';
    else if (task.status === 'error' || task.status === 'failed') mappedStatus = 'error';

    return {
      id: task.id,
      status: mappedStatus,
      audio_url: task.audio_url,
      image_url: task.image_url,
      title: task.title,
      duration: task.duration,
      error: task.error_message
    };
  } catch (error: any) {
    console.error("Polling Error:", error);
    return { id: taskId, status: 'processing', error: error.message };
  }
};

export const pollForCompletion = async (
  taskId: string, 
  onProgress: (status: string) => void
): Promise<SunoGenerationResponse> => {
  let attempts = 0;
  const maxAttempts = 60; // 2분 대기

  while (attempts < maxAttempts) {
    const result = await checkGenerationStatus(taskId);
    
    if (result.status === 'complete') {
      return result;
    }
    
    if (result.status === 'error') {
      throw new Error(result.error || "Generation failed");
    }

    onProgress(result.status);
    await new Promise(r => setTimeout(r, 2000));
    attempts++;
  }
  
  throw new Error("Timeout: 음악 생성 시간이 너무 오래 걸립니다.");
};
