
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeSystemLogs = async (logs: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are the ScrapShield AI System Auditor. Analyze the following PowerShell setup logs and current system state. Summarize security posture, missing components, and health. Format the output as a concise technical brief.\n\nLOGS:\n${logs}`,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return "Audit service temporarily unavailable. Manual verification recommended.";
  }
};

export const describeEvidence = async (imageUrl: string, metadata: any) => {
  try {
    // This would typically use gemini-2.5-flash-image for visual analysis
    // For this demo, we use flash to process metadata
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze this security evidence event: ${JSON.stringify(metadata)}. Provide a 2-sentence tactical summary for the security team.`,
    });
    return response.text;
  } catch (error) {
    return "Event analysis pending.";
  }
};
