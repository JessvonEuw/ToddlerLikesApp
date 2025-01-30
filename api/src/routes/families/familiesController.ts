import type { Request, Response } from 'express';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { families } from '@/db/schema';

export async function listFamilies(req: Request, res: Response) {
  try {
    const familiesList = await db.select().from(families);

    res.json(familiesList);
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function getFamilyById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const [foundFamily] = await db
      .select()
      .from(families)
      .where(eq(families.id, id));

    if (!foundFamily) {
      res.status(404).send({ message: 'Item not found' });
    } else {
      res.json(foundFamily);
    }
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function createFamily(req: Request, res: Response) {
  try {
    const [createdFamily] = await db
      .insert(families)
      .values(req.body)
      .returning();

    res.status(201).json(createdFamily);
  } catch (e) {
    res.status(500).send({ message: 'Invalid family data' });
  }
}

export async function updateFamily(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const updatedFields = req.cleanBody;

    const [updatedFamily] = await db
      .update(families)
      .set(updatedFields)
      .where(eq(families.id, id))
      .returning();

    if (!updatedFamily) {
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
      .delete(families)
      .where(eq(families.id, id))
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
