import { Router } from 'express';
import {
  listItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from './itemsController.js';
import { createItemsSchema, updateItemsSchema } from '@/db/schema';
import { validateData } from '@/middlewares/validationMiddleware.js';
import { verifyToken, verifyParent } from '@/middlewares/authMiddleware.js';

const router = Router();

router.get('/', listItems);

router.get('/:id', getItemById);

router.post(
  '/',
  verifyToken,
  verifyParent,
  validateData(createItemsSchema),
  createItem
);
router.post(
  '/tags',
  verifyToken,
  verifyParent,
  validateData(createItemsSchema),
  createItem
);

router.put(
  '/:id',
  verifyToken,
  verifyParent,
  validateData(updateItemsSchema),
  updateItem
);

router.delete('/:id', verifyToken, verifyParent, deleteItem);

export default router;
