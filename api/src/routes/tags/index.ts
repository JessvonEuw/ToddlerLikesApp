import { Router } from 'express';
import {
  listTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag,
} from './itemsController.ts';

const router = Router();

router.get('/', listTags);

router.get('/:id', getTagById);

router.post('/', createTag);

router.put('/:id', updateTag);

router.delete('/:id', deleteTag);

export default router;
