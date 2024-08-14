import { SentimentComment } from "../types/Answer.type";

export class SentimentAnalisysService {

    public static async getSentimentAnalysis(text: string): Promise<SentimentComment> {
      const { VITE_GOOGLE_CLOUD_KEY } = import.meta.env;

      const response = await fetch(`https://language.googleapis.com/v2/documents:analyzeSentiment?key=${VITE_GOOGLE_CLOUD_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          document: {
            type: 'PLAIN_TEXT',
            content: text
          }
        })
      });

      const data = await response.json();

      const sentiment = {
        score: data.documentSentiment.score,
        magnitude: data.documentSentiment.magnitude
      } as SentimentComment;

      return sentiment;
    }
  }