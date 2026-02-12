import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateSongConcept = async (
  genre: string,
  mood: string,
  theme: string,
  additionalInfo: string
): Promise<{ lyrics: string; melody: string; structure: string; sunoPrompt: string; title: string }> => {
  
  if (!apiKey) {
    // Fallback for demo
    return new Promise(resolve => setTimeout(() => resolve({
      title: "네온 시티의 꿈",
      lyrics: `[Verse 1]\n네온 사인이 번지는 거리에서\n우리는 꿈을 쫓아 달려가네\n${theme} 그게 우리의 전부니까\n\n[Chorus]\n오, 이건 ${mood}의 멜로디\n외로움을 뚫고 울려 퍼져`,
      melody: "키: C Minor, BPM: 120. 신스 패드가 서서히 커지면서 리드미컬한 베이스라인으로 이어집니다.",
      structure: "Intro -> Verse -> Chorus -> Outro",
      sunoPrompt: `${genre}, ${mood}, male vocals, upbeat, synthwave, 120bpm, k-pop style`
    }), 2000));
  }

  const prompt = `
    당신은 한국의 전문 작곡가이자 Suno AI 프롬프트 엔지니어입니다.
    다음 입력 정보를 바탕으로 노래 컨셉을 만들어주세요:
    - 장르: ${genre}
    - 분위기: ${mood}
    - 주제/키워드: ${theme}
    - 추가 정보: ${additionalInfo}

    다음 내용을 JSON 형식으로 제공해주세요:
    1. title: 노래 제목 (한국어)
    2. lyrics: 노래 가사 (한국어). [Verse], [Chorus] 등의 태그를 명확히 붙여주세요.
    3. melody: 멜로디와 편곡에 대한 전문적인 설명 (한국어).
    4. structure: 곡의 구성.
    5. sunoPrompt: Suno AI 음원 생성에 사용할 스타일 태그들 (영어). 장르, 악기, 분위기, BPM 등을 콤마로 구분. (예: "k-pop, energetic, female vocals, 120bpm, piano")
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            lyrics: { type: Type.STRING },
            melody: { type: Type.STRING },
            structure: { type: Type.STRING },
            sunoPrompt: { type: Type.STRING }
          },
          required: ["title", "lyrics", "melody", "structure", "sunoPrompt"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("AI 응답이 없습니다.");
    
    return JSON.parse(text);
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw error;
  }
};