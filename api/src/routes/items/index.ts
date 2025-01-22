import { Router } from 'express';
import {
  listItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from './itemsController.js';
import { createItemSchema, updateItemSchema } from '../../db/schema/items.js';
import { validateData } from '../../middlewares/validationMiddleware.js';
import { verifyToken, verifyParent } from '../../middlewares/authMiddleware.js';

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
