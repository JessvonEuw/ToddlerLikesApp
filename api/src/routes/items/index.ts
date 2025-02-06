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
import { multerUpload, uploadToB2 } from '@/middlewares/imageMiddleware.js';

const router = Router();

router.get('/', listItems);

router.get('/:id', getItemById);

router.post(
  '/',
  verifyToken,
  verifyParent,
  multerUpload.single('image'),
  uploadToB2('items'),
  validateData(createItemsSchema),
  createItem
);

router.post(
  '/tags',
  verifyToken,
  verifyParent,
  multerUpload.single('image'),
  uploadToB2('items'),
  validateData(createItemsSchema),
  createItem
);

router.put(
  '/:id',
  verifyToken,
  verifyParent,
  multerUpload.single('image'),
  uploadToB2('items'),
  validateData(updateItemsSchema),
  updateItem
);

router.delete('/:id', verifyToken, verifyParent, deleteItem);

export default router;
