import Parser from 'rss-parser';

const parser = new Parser();

export async function fetchArticles(feedUrl: string) {
  try {
    const feed = await parser.parseURL(feedUrl);
    return feed.items.map((item) => ({
      title: item.title ?? 'untitled',
      link: item.link ?? '#',
      pubDate: item.pubDate ? new Date(item.pubDate) : undefined,
      source: feed.title ?? 'Unknown',
    }));
  } catch (error) {
    console.error('Error fetching feed:', error);
    return [];
  }
}
