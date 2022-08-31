import { Router } from 'express';
import { list, add, update, remove } from '../controllers/events';

const router = Router();

router.get('/', list);
router.post('/', add);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;