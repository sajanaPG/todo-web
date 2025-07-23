import { Request, Response, NextFunction } from 'express';
import { AnySchema, ValidationError } from 'yup';
import { badRequestResponse } from '../utils/responses';

export const validate = (schema: AnySchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(
        {
          body: req.body,
          query: req.query,
          params: req.params,
        },
        { abortEarly: false }
      );

      return next();
    } catch (err) {
      if (err instanceof ValidationError) {
        const message = err.inner.map((e) => e.message).join(', ');
        return badRequestResponse(res, message);
      }
      return next(err);
    }
  };
};
