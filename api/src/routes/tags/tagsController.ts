import type { Request, Response } from 'express';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { tags } from '@/db/schema';

export async function listTags(req: Request, res: Response) {
  try {
    const tagsList = await db.select().from(tags);

    res.json(tagsList);
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function createTag(req: Request, res: Response) {
  try {
    const userId = req.userId;

    const [createdTag] = await db
      .insert(tags)
      .values({ familyId: 2, createdBy: userId, ...req.cleanBody })
      .returning();

    res.status(201).json(createdTag);
  } catch (e) {
    res.status(500).send(e);
  }
}
export async function updateTag(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const updatedFields = req.cleanBody;

    const [updatedTag] = await db
      .update(tags)
      .set(updatedFields)
      .where(eq(tags.id, id))
      .returning();

    if (!updatedTag) {
      res.status(404).send({ message: 'Tag not found' });
    } else {
      res.json(updatedTag);
    }
  } catch (e) {
    res.status(500).send(e);
  }
}
export async function deleteTag(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const [deletedItem] = await db
      .delete(tags)
      .where(eq(tags.id, id))
      .returning();

    if (!deletedItem) {
      res.status(404).send({ message: 'Tag not found' });
    } else {
      res.status(204).send();
    }
  } catch (e) {
    res.status(500).send(e);
  }
}
