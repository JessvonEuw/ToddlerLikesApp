import { Router } from 'express';
import {
  createFamily,
  deleteFamily,
  getFamilyById,
  listFamilies,
  updateFamily,
} from './familiesController.js';
import { validateData } from '../../middlewares/validationMiddleware.js';
import { createFamiliesSchema } from '../../db/schema/families.js';

const router = Router();

// List of all families
router.get('/', listFamilies);

// Get one family by id
router.get('/:id', getFamilyById);

// Create a family
router.post('/', validateData(createFamiliesSchema), createFamily);

// Update a family
router.put('/:id', validateData(createFamiliesSchema), updateFamily);

// Delete a family
router.delete('/:id', validateData(createFamiliesSchema), deleteFamily);

export default router;
