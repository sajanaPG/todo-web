import * as yup from 'yup';

export const createTaskSchema = yup.object({
  body: yup.object({
    title: yup
      .string()
      .typeError('Title must be a string')
      .strict(true)
      .required('Title is required'),
    description: yup.string().typeError('Description must be a string').strict(true).optional(),
  }),
});

export const markTaskCompletedSchema = yup.object({
  params: yup.object({
    id: yup.string().uuid('Id is invalid').required('Id is required'),
  }),
});

export const getTasksSchema = yup.object({
  query: yup.object({
    take: yup
      .number()
      .typeError('Take must be a number')
      .integer('Take must be an integer')
      .min(1, 'Take must be at least 1')
      .optional(),
  }),
});
