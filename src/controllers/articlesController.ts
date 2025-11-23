import type { Request, Response } from 'express';
import { fetchArticles } from '../services/rssService.ts';
import type { Article } from '../models/articleModel.ts';
import { feeds } from '../models/stackFeeds.ts';

export const getArticlesByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const urls = feeds[category as keyof typeof feeds];

    if (!urls) {
      return res.status(404).json({ error: 'Category not found' });
    }

    let articles: Article[] = [];
    for (const url of urls) {
      const feedArticles = await fetchArticles(url);
      articles = [...articles, ...feedArticles];
    }

    res.json({ category, articles });
  } catch (error) {
    return res.status(500).json({error: 'Failed to fetch articles.'})
  }
};
