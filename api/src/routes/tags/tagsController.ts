import type { Request, Response } from 'express';
import { eq } from 'drizzle-orm';
import { db } from '../../db';
import tagsTable from '../../db/schema/tags';

export async function listTags(req: Request, res: Response) {
  try {
    const items = await db.select().from(tagsTable);

    res.json(items);
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function createTag(req: Request, res: Response) {
  try {
    const userId = req.userId;
    console.log({ familyId: 2, createdBy: userId, ...req.cleanBody });
    const [tag] = await db
      .insert(tagsTable)
      .values({ familyId: 2, createdBy: userId, ...req.cleanBody })
      .returning();
    res.status(201).json(tag);
  } catch (e) {
    console.log('yikes');
    res.status(500).send(e);
  }
}
export async function updateTag(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const updatedFields = req.cleanBody;

    const [item] = await db
      .update(tagsTable)
      .set(updatedFields)
      .where(eq(tagsTable.id, id))
      .returning();

    if (!item) {
      res.status(404).send({ message: 'Tag not found' });
    } else {
      res.json(item);
    }
  } catch (e) {
    res.status(500).send(e);
  }
}
export async function deleteTag(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const [deletedItem] = await db
      .delete(tagsTable)
      .where(eq(tagsTable.id, id))
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
