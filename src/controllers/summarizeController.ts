import type { Request, Response } from "express";
import { summarizeArticle } from "../services/summarizeArticle.mts";

export const summarizeController = async (req: Request, res: Response) => {
    try {
      const url = req.query.url as string;
  
      if (!url) {
        return res.status(400).json({ error: "Missing ?url=" });
      }
  
      const summary = await summarizeArticle(url);
  
      res.json({ summary });
    } catch (err) {
      console.error("Summarization error:", err);
      res.status(500).json({ error: "Failed to summarize article." });
    }
  }
