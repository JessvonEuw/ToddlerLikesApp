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
import { verifyToken, verifyParent } from '../../middlewares/authMiddleware.ts';

const router = Router();

router.get('/', listItems);

router.get('/:id', getItemById);

router.post(
  '/',
  verifyToken,
  verifyParent,
  validateData(createItemSchema),
  createItem
);

router.put(
  '/:id',
  verifyToken,
  verifyParent,
  validateData(updateItemSchema),
  updateItem
);

router.delete('/:id', verifyToken, verifyParent, deleteItem);

export default router;
