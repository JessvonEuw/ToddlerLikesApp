import type { Request, Response } from 'express';
import { db } from '../../db/index.js';
import { itemsTable } from '../../db/itemsSchema.js';
import { eq } from 'drizzle-orm';

export async function listItems(req: Request, res: Response) {
  try {
    const items = await db.select().from(itemsTable);

    res.json(items);
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function getItemById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const [item] = await db
      .select()
      .from(itemsTable)
      .where(eq(itemsTable.id, id));

    if (!item) {
      res.status(404).send({ message: 'Item not found' });
    } else {
      res.json(item);
    }
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function createItem(req: Request, res: Response) {
  try {
    const [item] = await db
      .insert(itemsTable)
      .values(req.cleanBody)
      .returning();
    res.status(201).json(item);
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function updateItem(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const updatedFields = req.cleanBody;

    const [item] = await db
      .update(itemsTable)
      .set(updatedFields)
      .where(eq(itemsTable.id, id))
      .returning();

    if (!item) {
      res.status(404).send({ message: 'Item not found' });
    } else {
      res.json(item);
    }
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function deleteItem(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const [deletedItem] = await db
      .delete(itemsTable)
      .where(eq(itemsTable.id, id))
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
