import type { Request, Response } from 'express';
import { eq } from 'drizzle-orm';
import { db } from '../../db/index.js';
import { familiesTable } from '../../db/schema/families';

export async function listFamilies(req: Request, res: Response) {
  try {
    const families = await db.select().from(familiesTable);

    res.json(families);
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function getFamilyById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const [item] = await db
      .select()
      .from(familiesTable)
      .where(eq(familiesTable.id, id));

    if (!item) {
      res.status(404).send({ message: 'Item not found' });
    } else {
      res.json(item);
    }
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function createFamily(req: Request, res: Response) {
  try {
    const [family] = await db
      .insert(familiesTable)
      .values(req.body)
      .returning();

    res.status(201).json(family);
  } catch (e) {
    res.status(500).send({ message: 'Invalid family data' });
  }
}

export async function updateFamily(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const updatedFields = req.cleanBody;
    console.log(updatedFields);

    const [family] = await db
      .update(familiesTable)
      .set(updatedFields)
      .where(eq(familiesTable.id, id))
      .returning();

    if (!family) {
      res.status(404).send({ message: 'Family not found' });
    } else {
      res.status(204).send();
    }
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function deleteFamily(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const [deletedFamily] = await db
      .delete(familiesTable)
      .where(eq(familiesTable.id, id))
      .returning();

    if (!deletedFamily) {
      res.status(404).send({ message: 'Family not found' });
    } else {
      res.status(204).send();
    }
  } catch (e) {
    res.status(500).send(e);
  }
}
