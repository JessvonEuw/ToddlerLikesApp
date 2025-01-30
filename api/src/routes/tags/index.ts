import { Router } from 'express';
import { createTagsSchema } from '@/db/schema';
import { createTag, deleteTag, listTags, updateTag } from './tagsController';
import { validateData } from '@/middlewares/validationMiddleware';
import { verifyParent, verifyToken } from '@/middlewares/authMiddleware';

const router = Router();

router.get('/', listTags);

// router.get('/:id', );

// Create a tag
router.post(
  '/',
  verifyToken,
  verifyParent,
  validateData(createTagsSchema),
  createTag
);

// Update a tag
router.put(
  '/:id',
  verifyToken,
  verifyParent,
  validateData(createTagsSchema),
  updateTag
);

// Delete a tag
router.delete('/:id', verifyToken, verifyParent, deleteTag);

export default router;
