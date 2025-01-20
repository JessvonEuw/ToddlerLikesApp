import { Router } from 'express';
import {
  listItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from './itemsController.ts';
import { createItemSchema, updateItemSchema } from '../../db/itemsSchema.ts';
import { validateData } from '../../middlewares/validationMiddleware.ts';

const router = Router();

router.get('/', listItems);

router.get('/:id', getItemById);

router.post('/', validateData(createItemSchema), createItem);

router.put('/:id', validateData(updateItemSchema), updateItem);

router.delete('/:id', deleteItem);

export default router;
