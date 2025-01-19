import { Router } from 'express';
import { listPreferences, getPreferenceById, createPreference, updatePreference, deletePreference } from './preferencesController.ts';

const router = Router();

router.get('/', listPreferences);

router.get('/:id', getPreferenceById);

router.post('/', createPreference);

router.put('/:id', updatePreference);

router.delete('/:id', deletePreference);

export default router;