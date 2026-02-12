
// Suno API Service
// Unofficial Suno API Wrapper와 통신하기 위한 서비스입니다.
// 중요: 아래 CONFIG 객체에 직접 API 주소와 쿠키를 입력하세요.

// ==========================================
// [관리자 설정] 여기에 값을 직접 입력하세요
// ==========================================
const CONFIG = {
  // 1. Suno API 서버 주소 (예: http://localhost:3000 또는 https://my-suno-api.vercel.app)
  BASE_URL: 'https://suno-api-ejfv.onrender.com', 

  // 2. Suno 계정 인증 쿠키 (suno.com > F12 > Network > Cookie 값 전체)
  COOKIE: '_ga=GA1.1.1565055388.1732499053; ajs_anonymous_id=45bc27d5-c476-4b3b-8c02-f172424b77a5; _fbp=fb.1.1733447092957.745965835635917587; _tt_enable_cookie=1; _ttp=5bQWfqxDb-9W2b3XeI8EHhk65Dg.tt.1; __stripe_mid=dcd6c557-49f0-4675-800a-0456d1afd4c0fa8c08; afUserId=582e93cb-25db-4b9a-b0bc-f2c41d398e43-p; singular_device_id=f3c84740-fca1-4c7c-bea9-f6785a8368ab; _axwrt=d9c23f82-fad3-463b-a7a2-fee48add50e0; _scid=VtIgp0z3taGopdGYtq2Mf1zn7CnK7Zws; __client_uat_U9tcbTPE=1763713570; _gcl_au=1.1.671849443.1766537464.845126027.1766563342.1766564393; _gcl_gs=2.1.k1$i1767946559$u42332455; __client_uat=1768546212; __client_uat_Jnxw-muT=1768546212; __session=eyJhbGciOiJSUzI1NiIsImtpZCI6InN1bm8tYXBpLXJzMjU2LWtleS0xIiwidHlwIjoiSldUIn0.eyJzdW5vLmNvbS9jbGFpbXMvY2xlcmtfaWQiOiJ1c2VyXzJ5Y3NHQmh5azFBU2JpTzdKeWYwT1ZoRmpsaiIsInN1bm8uY29tL2NsYWltcy90b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzcwODgzNjY4LCJhdWQiOiJzdW5vLWFwaSIsInN1YiI6InVzZXJfMnljc0dCaHlrMUFTYmlPN0p5ZjBPVmhGamxqIiwiYXpwIjoiaHR0cHM6Ly9zdW5vLmNvbSIsImZ2YSI6WzAsLTFdLCJpYXQiOjE3NzA4ODAwNjgsImlzcyI6Imh0dHBzOi8vYXV0aC5zdW5vLmNvbSIsImppdCI6IjIxOWJkYTYwLWVjZDItNDIwNS1iYTI2LTQ3YTcyNTZmNjQwYiIsInZpeiI6ZmFsc2UsInN1bm8uY29tL2NsYWltcy9lbWFpbCI6ImNodXBpbjEyOUBuYXZlci5jb20iLCJodHRwczovL3N1bm8uYWkvY2xhaW1zL2VtYWlsIjoiY2h1cGluMTI5QG5hdmVyLmNvbSJ9.JKyovKhSBJZM8mkYXdGEqOHpjtqeGjPW9AMHCUQHkm1CVWWuQ3fFvmKgjoZPTx8YykRax-NYG1jrGtGXfd_z_p8f4nxv8WdH_J1_YrP1HYR49eRpyh9nGY7-Q3qFpl27vA9-HGmCLbOZzyzM5iJAHAvpldN9X5rkEJHQ0em0uvFYf8x4gByzwMiKy4oAJ93C-grmK_4OV-NfocxhruAGtbGWT7iW92AVFQ6mjcsRGyjH-2ws8gRCxsABmUlaoHuUc3CkP5rPe0HCI0m_KFO5Ap79GNoMA5C0JkNjGRFfTAmuqRhNuV_9qFdU8Nm_T6hit8yF43cYU2TqczxIkoWBzA; IR_gbd=suno.com; t-ip=1; _sp_ses.e685=*; _ScCbts=%5B%5D; ab.storage.deviceId.b67099e5-3183-4de8-8f8f-fdea9ac93d15=g%3A2a621094-a105-49ec-a590-fdd3077f8f09%7Ce%3Aundefined%7Cc%3A1767935450436%7Cl%3A1770880069746; ab.storage.userId.b67099e5-3183-4de8-8f8f-fdea9ac93d15=g%3A896d6528-0962-4f7c-9220-63652b86ed2a%7Ce%3Aundefined%7Cc%3A1767935451963%7Cl%3A1770880069747; _sctr=1%7C1770822000000; _clck=1y82krl%5E2%5Eg3i%5E0%5E2063; __stripe_sid=625f855c-b526-4477-86a3-acf36d7a47171ddb8f; _uetsid=8a45753007e111f1b1c867a628fc44e6|1bw4u3t|2|g3i|0|2234; __client=eyJhbGciOiJSUzI1NiIsImtpZCI6InN1bm8tYXBpLXJzMjU2LWtleS0xIiwidHlwIjoiSldUIn0.eyJzdW5vLmNvbS9jbGFpbXMvY2xlcmtfaWQiOiJ1c2VyXzJ5Y3NHQmh5azFBU2JpTzdKeWYwT1ZoRmpsaiIsInN1bm8uY29tL2NsYWltcy90b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzcwODgzNjY4LCJhdWQiOiJzdW5vLWFwaSIsInN1YiI6InVzZXJfMnljc0dCaHlrMUFTYmlPN0p5ZjBPVmhGamxqIiwiYXpwIjoiaHR0cHM6Ly9zdW5vLmNvbSIsImZ2YSI6WzAsLTFdLCJpYXQiOjE3NzA4ODAwNjgsImlzcyI6Imh0dHBzOi8vYXV0aC5zdW5vLmNvbSIsImppdCI6IjIxOWJkYTYwLWVjZDItNDIwNS1iYTI2LTQ3YTcyNTZmNjQwYiIsInZpeiI6ZmFsc2UsInN1bm8uY29tL2NsYWltcy9lbWFpbCI6ImNodXBpbjEyOUBuYXZlci5jb20iLCJodHRwczovL3N1bm8uYWkvY2xhaW1zL2VtYWlsIjoiY2h1cGluMTI5QG5hdmVyLmNvbSJ9.UodXMxMbbMAjGP282K7kEvjlYiFuESfODsUgMXlQfaTAHbeJFPpVrJ2VZoXzkjG22L-EpVyL2_WVEK4RZcWzXj8K3lqyEVf22XOaRi3Z4yme6Vzxyh5rOYxjIdxNcGY7SOcnLMrxMfbpuJY6BvboDNVsGcu4wVohCi3YCxZjL43xxkn9-Al9w8wCqCXeM29baJCR4_Ngv_HvoWGwE3SKQ3pfYWxLXzrdCpmfUnNLuw79pEd9vVZuilfNT4_hDL1bXxHGrjYZ5ido5wmTlU9GGJigtzehNJQcdgVXm6_c2wCdbqUlAoOssQSl3p_u9SmBTX8qqT7EX31SqM7i0jHaTQ; __client_Jnxw-muT=eyJhbGciOiJSUzI1NiIsImtpZCI6InN1bm8tYXBpLXJzMjU2LWtleS0xIiwidHlwIjoiSldUIn0.eyJzdW5vLmNvbS9jbGFpbXMvY2xlcmtfaWQiOiJ1c2VyXzJ5Y3NHQmh5azFBU2JpTzdKeWYwT1ZoRmpsaiIsInN1bm8uY29tL2NsYWltcy90b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzcwODgzNjY4LCJhdWQiOiJzdW5vLWFwaSIsInN1YiI6InVzZXJfMnljc0dCaHlrMUFTYmlPN0p5ZjBPVmhGamxqIiwiYXpwIjoiaHR0cHM6Ly9zdW5vLmNvbSIsImZ2YSI6WzAsLTFdLCJpYXQiOjE3NzA4ODAwNjgsImlzcyI6Imh0dHBzOi8vYXV0aC5zdW5vLmNvbSIsImppdCI6IjIxOWJkYTYwLWVjZDItNDIwNS1iYTI2LTQ3YTcyNTZmNjQwYiIsInZpeiI6ZmFsc2UsInN1bm8uY29tL2NsYWltcy9lbWFpbCI6ImNodXBpbjEyOUBuYXZlci5jb20iLCJodHRwczovL3N1bm8uYWkvY2xhaW1zL2VtYWlsIjoiY2h1cGluMTI5QG5hdmVyLmNvbSJ9.UodXMxMbbMAjGP282K7kEvjlYiFuESfODsUgMXlQfaTAHbeJFPpVrJ2VZoXzkjG22L-EpVyL2_WVEK4RZcWzXj8K3lqyEVf22XOaRi3Z4yme6Vzxyh5rOYxjIdxNcGY7SOcnLMrxMfbpuJY6BvboDNVsGcu4wVohCi3YCxZjL43xxkn9-Al9w8wCqCXeM29baJCR4_Ngv_HvoWGwE3SKQ3pfYWxLXzrdCpmfUnNLuw79pEd9vVZuilfNT4_hDL1bXxHGrjYZ5ido5wmTlU9GGJigtzehNJQcdgVXm6_c2wCdbqUlAoOssQSl3p_u9SmBTX8qqT7EX31SqM7i0jHaTQ; ttcsid=1770880069111::kvKRHtFodcvXc83_y8cY.153.1770880091280.0; ttcsid_CT67HURC77UB52N3JFBG=1770880069110::tZPZvEN0mrkS2QOu3EGI.16.1770880091280.1; _uetvid=65fd2ce0816311f08416fd0a1cb684c3|1bye8re|1770880091571|2|1|bat.bing.com/p/conversions/c/b; ab.storage.sessionId.b67099e5-3183-4de8-8f8f-fdea9ac93d15=g%3A7fdccc13-634b-4754-a87e-15e936fbea38%7Ce%3A1770881891913%7Cc%3A1770880069745%7Cl%3A1770880091913; _clsk=1n6bsfm%5E1770880092196%5E2%5E0%5Eb.clarity.ms%2Fcollect; ax_visitor=%7B%22firstVisitTs%22%3A1750071145685%2C%22lastVisitTs%22%3A1769759131481%2C%22currentVisitStartTs%22%3A1770880068906%2C%22ts%22%3A1770880151897%2C%22visitCount%22%3A134%7D; _ga_7B0KEDD7XP=GS2.1.s1770880068$o197$g1$t1770880152$j60$l0$h0$dGUrw9qlh2wVz62dvYXc3ePtyTpyqyUCVuQ; _scid_r=ZVIgp0z3taGopdGYtq2Mf1zn7CnK7ZwscZWZ4Q; tatari-session-cookie=f2ead32d-4200-ad27-d55f-2e2516c3ec7d; IR_46384=1770880152989%7C0%7C1770880152989%7C%7C; _sp_id.e685=53f40516-0ae1-48f7-a077-85aa1bcf7ff8.1760057168.56.1770880153.1769760254.2ab82b3a-4bd3-4f32-88a5-3e87ff7af385.8237bda6-f777-4669-81dc-91ca0fa6f25b.a256b556-052c-47a2-aa92-3ebb0b0bdaaf.1770880069146.4' 
};
// ==========================================

export interface SunoGenerationResponse {
  id: string;
  status: 'submitted' | 'processing' | 'complete' | 'error';
  audio_url?: string;
  image_url?: string;
  title?: string;
  duration?: number;
  error?: string;
}

// 설정 가져오기 (하드코딩된 값 사용)
export const getSunoConfig = () => ({
  baseUrl: CONFIG.BASE_URL,
  token: CONFIG.COOKIE
});

export const saveSunoConfig = (baseUrl: string, token: string) => {
    console.log("Config is now hardcoded in services/sunoService.ts");
};

// 커스텀 모드(가사 + 스타일)로 음악 생성 요청
export const generateMusic = async (
  styleTags: string, 
  lyrics: string, 
  title: string
): Promise<string> => {
  const { baseUrl, token } = getSunoConfig();

  if (!baseUrl) {
    throw new Error("Suno API URL이 코드에 설정되지 않았습니다.");
  }
  
  if (!token) {
    console.warn("Suno API Token(Cookie)이 설정되지 않았습니다.");
  }

  console.log(`[Suno API] Requesting generation to ${baseUrl}...`);

  try {
    // [중요] 브라우저 보안 정책(CORS/Forbidden Headers)으로 인해 'Cookie' 헤더를 직접 보낼 수 없습니다.
    // 일부 Suno API 서버는 Body나 Query Parameter로 토큰을 받는 것을 지원합니다.
    
    // 1. URL에 토큰 추가 (Query Param 방식)
    const url = new URL(`${baseUrl}/api/custom_generate`);
    // 일부 서버는 token, 일부는 cookie 파라미터를 사용하므로 둘 다 시도
    // url.searchParams.append('token', token); 
    
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        // 'Cookie': token, // <-- 브라우저 차단됨
        'Authorization': `Bearer ${token}` // 대안: Authorization 헤더
      },
      body: JSON.stringify({
        prompt: lyrics,
        tags: styleTags,
        title: title,
        make_instrumental: false,
        wait_audio: false,
        cookie: token // 대안: Body에 쿠키 포함
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMsg = errorText;
      try {
        const jsonError = JSON.parse(errorText);
        errorMsg = jsonError.error || jsonError.detail || errorText;
      } catch(e) {}

      // 쿠키 헤더 필수 에러가 계속 발생한다면, 유저에게 서버 설정을 안내해야 합니다.
      if (errorMsg.includes("Cookie header") || response.status === 500) {
         throw new Error(
            `서버 인증 오류: API 서버가 브라우저 요청을 거부했습니다. \n` +
            `해결책: API 서버(Render)의 환경변수(.env)에 'SUNO_COOKIE'를 직접 설정해야 합니다. \n` +
            `(브라우저는 보안상 쿠키 헤더를 전송할 수 없습니다)`
         );
      }

      throw new Error(`API Error (${response.status}): ${errorMsg}`);
    }

    const data = await response.json();
    const tasks = Array.isArray(data) ? data : [data];
    const taskId = tasks[0]?.id;

    if (!taskId) {
      throw new Error("API 응답에서 Task ID를 찾을 수 없습니다.");
    }

    return taskId;
  } catch (error: any) {
    console.error("[Suno API] Generation Failed:", error);
    throw error;
  }
};

// 상태 확인 (Polling)
export const checkGenerationStatus = async (taskId: string): Promise<SunoGenerationResponse> => {
  const { baseUrl, token } = getSunoConfig();

  try {
    const url = new URL(`${baseUrl}/api/get`);
    url.searchParams.append('ids', taskId);
    // 상태 확인시에도 토큰 전달 시도
    // url.searchParams.append('token', token);

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Status Check Error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    const task = Array.isArray(data) ? data[0] : data;

    if (!task) {
        throw new Error("Task not found");
    }

    // 상태 매핑
    let mappedStatus: SunoGenerationResponse['status'] = 'processing';
    
    if (task.status === 'complete' || task.status === 'succeeded') {
        mappedStatus = 'complete';
    } else if (task.status === 'error' || task.status === 'failed') {
        mappedStatus = 'error';
    }

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
    console.warn("[Suno API] Status Check Warning:", error);
    // 폴링 중 에러가 나도 잠시 대기 후 재시도할 수 있도록 processing 상태 반환
    return { id: taskId, status: 'processing' };
  }
};

// 폴링 헬퍼 함수
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
      throw new Error(result.error || "Generation failed at remote server");
    }

    onProgress(result.status);
    await new Promise(r => setTimeout(r, 2000));
    attempts++;
  }
  
  throw new Error("Generation timed out (2 minutes limit)");
};
