import { Router } from 'express';
import { listFoods, getFoodById, createFood, updateFood, deleteFood } from './foodsController.ts';

const router = Router();

router.get('/', listFoods);

router.get('/:id', getFoodById);

router.post('/', createFood);

router.put('/:id', updateFood);

router.delete('/:id', deleteFood);

export default router;