'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { ITodo } from './types';

const prisma = new PrismaClient();

export const getUserTodoListAction = async ({
  userId,
}: {
  userId: string | null;
}): Promise<Array<ITodo>> => {
  try {
    return await prisma.task.findMany({
      where: {
        userId: userId as string,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  } catch (error) {
    throw new Error('Something went wrong');
  }
};

/**
 * Creates a new todo item.
 *
 * @param {Object} params - The parameters object.
 * @param {string} params.title - The title of the todo item.
 * @param {string | null} params.userId - The ID of the user creating the todo item.
 * @returns {Promise<void>} - A promise that resolves when the todo item is successfully created.
 * @throws {Error} - Throws an error if something goes wrong during the creation process.
 */
export const createTodoAction = async ({
  title,
  userId,
}: {
  title: string;
  userId: string | null;
}): Promise<void> => {
  try {
    await prisma.task.create({
      data: {
        title,
        userId: userId as string,
      },
    });

    revalidatePath('/');
  } catch (error) {
    throw new Error(`Something went wrong ${error}`);
  }
};

/**
 * Deletes a todo item.
 *
 * @param {Object} params - The parameters object.
 * @param {string} params.id - The ID of the todo item to be deleted.
 * @returns {Promise<void>} - A promise that resolves when the todo item is successfully deleted.
 */
export const deleteTodoAction = async ({
  id,
}: {
  id: string;
}): Promise<void> => {
  await prisma.task.delete({
    where: {
      id,
    },
  });

  revalidatePath('/');
};

/**
 * Updates a todo item.
 *
 * @param {ITodo} params - The parameters object containing the todo item details.
 * @param {string} params.id - The ID of the todo item to be updated.
 * @param {string} params.title - The updated title of the todo item.
 * @returns {Promise<void>} - A promise that resolves when the todo item is successfully updated.
 * @throws {Error} - Throws an error if something goes wrong during the update process.
 */
export const updateTodoAction = async ({
  id,
  title,
  userId,
}: ITodo): Promise<void> => {
  try {
    await prisma.task.update({
      where: {
        id,
      },
      data: {
        title,
        userId,
      },
    });

    revalidatePath('/');
  } catch (error) {
    throw new Error('Something went wrong');
  }
};
