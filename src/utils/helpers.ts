'use server';
import { revalidatePath } from 'next/cache';
import { createTodo } from './dbQueries';
import { z } from 'zod';

const schema = z.object({
  content: z
    .string({ message: 'Must be a string...' })
    .min(2, 'To do item must be atleast 2 characters long!')
    .max(50, 'To do item must be at most 50 characters long!'),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const create = async (prevState: any, formData: FormData) => {
  'use server';
  const validateFields = schema.safeParse({
    content: formData.get('content'),
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.issues,
    };
  } else {
    const data = {
      content: formData.get('content') as string,
    };
    await createTodo(data);
    revalidatePath('/');
  }
};
