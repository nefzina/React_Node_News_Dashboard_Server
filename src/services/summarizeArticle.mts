import { GoogleGenAI } from '@google/genai';
import * as cheerio from 'cheerio';
import fetch from 'node-fetch';
import { config } from '../config/config.ts';

if (!config.AI_API_KEY) {
  throw new Error('Missing API_KEY');
}
const client = new GoogleGenAI({
  apiKey: config.AI_API_KEY,
});

export async function summarizeArticle(url: string): Promise<string> {
  try {
    const articleText = await extractArticleText(url);

    if (!articleText || articleText.length < 100) {
      throw new Error(
        "Impossible d'extraire suffisamment de texte de l'article.",
      );
    }

    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Summarize the following article in its original language. Keep the summary under 150 words. Focus only on key facts and main ideas :\n\n${articleText}`,
    });

    return response.text || 'Résumé indisponible.';
    
  } catch (error) {
    console.log(error);
    return 'Résumé indisponible.';
  }
}

async function extractArticleText(url: string): Promise<string> {
  const response = await fetch(url);
  const html = await response.text();

  const $ = cheerio.load(html);

  // Extraire les paragraphes
  const paragraphs: string[] = [];

  $('p').each((_, el) => {
    const text = $(el).text().trim();
    if (text.length > 40) paragraphs.push(text); // Filtrer les très petites phrases
  });

  return paragraphs.join('\n\n');
}
