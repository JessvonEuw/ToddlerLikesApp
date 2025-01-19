import type { Request, Response } from 'express';

export function listTags(req: Request, res: Response) {
  res.send('listTags');
}

export function getTagById(req: Request, res: Response) {
  res.send('geTagById');
}

export function createTag(req: Request, res: Response) {
  console.log(req.body);
  res.send('createTag');
}

export function updateTag(req: Request, res: Response) {
  res.send('updateTag');
}

export function deleteTag(req: Request, res: Response) {
  res.send('deleteTag');
}
