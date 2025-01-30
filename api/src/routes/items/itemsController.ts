import type { Request, Response } from 'express';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { items } from '@/db/schema';

export async function listItems(req: Request, res: Response) {
  try {
    const itemsList = await db.select().from(items);

    res.json(itemsList);
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function getItemById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const [foundItem] = await db.select().from(items).where(eq(items.id, id));

    if (!foundItem) {
      res.status(404).send({ message: 'Item not found' });
    } else {
      res.json(foundItem);
    }
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function createItem(req: Request, res: Response) {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(400).send({ message: 'Invalid item data' });
    }
    const [createdItem] = await db
      .insert(items)
      .values(req.cleanBody)
      .returning();
    res.status(201).json(createdItem);
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function createItemWithTags(req: Request, res: Response) {
  try {
    const [createdItem] = await db
      .insert(items)
      .values(req.cleanBody)
      .returning();
    res.status(201).json(createdItem);
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function updateItem(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const updatedFields = req.cleanBody;

    const [updatedItem] = await db
      .update(items)
      .set(updatedFields)
      .where(eq(items.id, id))
      .returning();

    if (!updatedItem) {
      res.status(404).send({ message: 'Item not found' });
    } else {
      res.json(updatedItem);
    }
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function deleteItem(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const [deletedItem] = await db
      .delete(items)
      .where(eq(items.id, id))
      .returning();

    if (!deletedItem) {
      res.status(404).send({ message: 'Item not found' });
    } else {
      res.status(204).send();
    }
  } catch (e) {
    res.status(500).send(e);
  }
}
