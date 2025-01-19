import { Router } from 'express';
import {
  listItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from './itemsController.ts';

const router = Router();

router.get('/', listItems);

router.get('/:id', getItemById);

router.post('/', createItem);

router.put('/:id', updateItem);

router.delete('/:id', deleteItem);

export default router;
