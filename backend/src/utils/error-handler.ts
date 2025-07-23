import { Response } from 'express';
import {
  BadRequestError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from '../utils/custom-errors';
import {
  notFoundResponse,
  badRequestResponse,
  errorResponse,
  forbiddenResponse,
  unAuthorizedResponse,
} from '../utils/responses';

export const handleError = (res: Response, error: any) => {
  switch (true) {
    case error instanceof NotFoundError:
      return notFoundResponse(res, error.message);

    case error instanceof BadRequestError:
      return badRequestResponse(res, error.message);

    case error instanceof UnauthorizedError:
      return unAuthorizedResponse(res, error.message);

    case error instanceof ForbiddenError:
      return forbiddenResponse(res, error.message);

    case error instanceof InternalServerError:
      return errorResponse(res, error.message);

    default:
      return errorResponse(res, 'Internal server error');
  }
};
