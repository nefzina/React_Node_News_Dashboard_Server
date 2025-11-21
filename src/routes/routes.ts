import { Router } from 'express';
import type { Request, Response } from 'express';
import { fetchArticles } from '../services/rssService.ts';
import type { Article } from '../api/articles/articleModel.ts';

const router = Router();

const feeds = {
  react: [
    'https://react.statuscode.com/rss',
    'https://react.dev/blog/rss.xml',
    'https://www.reddit.com/r/reactjs/.rss',
  ],
  node: [
    'https://nodeweekly.com/rss',
    'https://nodejs.org/en/feed/blog.xml',
    'https://dev.to/feed/tag/node',
  ],
  express: [
    'https://expressjs.com/en/feed/blog.xml',
    'https://github.com/expressjs/express/releases.atom',
    'https://stackoverflow.com/feeds/tag/express',
  ],
};

router.get('/:category', async (req: Request, res: Response) => {
  const { category } = req.params;
  const urls = feeds[category as keyof typeof feeds];
  console.log('category needed', category);

  if (!urls) {
    return res.status(404).json({ error: 'Category not found' });
  }

  let articles: Article[] = [];
  for (const url of urls) {
    const feedArticles = await fetchArticles(url);
    articles = [...articles, ...feedArticles];
  }

  res.json({ category, articles });
});

export default router;
