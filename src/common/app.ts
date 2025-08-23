import express from 'express';
import type { Application, Request, Response } from 'express';
import routes from '../routes/routes.ts';

const app: Application = express();

app.use(express.json());

// Root route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the React/Node News Dashboard API 🚀' });
});

// API routes
app.use('/api', routes);

export default app;
