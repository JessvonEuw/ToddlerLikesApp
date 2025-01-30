import { Router } from 'express';
import {
  createFamily,
  deleteFamily,
  getFamilyById,
  listFamilies,
  updateFamily,
} from './familiesController.js';
import { validateData } from '@/middlewares/validationMiddleware.js';
import { createFamiliesSchema } from '@/db/schema';
import { verifyParent, verifyToken } from '@/middlewares/authMiddleware.js';

const router = Router();

// List of all families
router.get('/', listFamilies);

// Get one family by id
router.get('/:id', getFamilyById);

// Create a family
router.post(
  '/',
  verifyToken,
  verifyParent,
  validateData(createFamiliesSchema),
  createFamily
);

// Update a family
router.put(
  '/:id',
  verifyToken,
  verifyParent,
  validateData(createFamiliesSchema),
  updateFamily
);

// Delete a family
router.delete('/:id', verifyToken, verifyParent, deleteFamily);

export default router;
