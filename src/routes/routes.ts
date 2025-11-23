import { Router } from 'express';
import { summarizeController } from '../controllers/summarizeController.ts';
import { getArticlesByCategory } from '../controllers/ArticlesController.ts';

const router = Router();

router.get('/summarize', summarizeController);
router.get('/:category', getArticlesByCategory);

export default router;
