import type { Request, Response } from 'express';

export function listPreferences(req: Request, res: Response) {
  res.send('listPreferences');
}

export function getPreferenceById(req: Request, res: Response) {
  res.send('getPreferenceById');
}

export function createPreference(req: Request, res: Response) {
  console.log(req.body);
  res.send('createPreference');
}

export function updatePreference(req: Request, res: Response) {
  res.send('updatePreference');
}

export function deletePreference(req: Request, res: Response) {
  res.send('deletePreference');
}
