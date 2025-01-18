import type { Request, Response } from 'express';

export function listFoods(req: Request, res: Response) {
  res.send('listFoods');
}

export function getFoodById(req: Request, res: Response) {
  res.send('getFoodById');
}

export function createFood(req: Request, res: Response) {
  res.send('createFood');
}

export function updateFood(req: Request, res: Response) {
  res.send('updateFood');
}

export function deleteFood(req: Request, res: Response) {
  res.send('deleteFood');
}
