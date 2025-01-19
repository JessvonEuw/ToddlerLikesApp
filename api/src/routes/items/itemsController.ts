import type { Request, Response } from 'express';

export function listItems(req: Request, res: Response) {
  res.send('listItems');
}

export function getItemById(req: Request, res: Response) {
  res.send('geItemById');
}

export function createItem(req: Request, res: Response) {
  console.log(req.body);
  res.send('createItem');
}

export function updateItem(req: Request, res: Response) {
  res.send('updateItem');
}

export function deleteItem(req: Request, res: Response) {
  res.send('deleteItem');
}
