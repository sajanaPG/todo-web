import { Response } from 'express';

export const successResponse = (res: Response, data: any, message?: string) => {
  return res.status(200).send({
    success: true,
    data: data,
    message: message,
  });
};

export const createdResponse = (res: Response, data: any, message?: string) => {
  return res.status(201).send({
    success: true,
    data: data,
    message: message,
  });
};

export const badRequestResponse = (res: Response, message: string) => {
  return res.status(400).send({
    success: false,
    message: message,
  });
};

export const errorResponse = (res: Response, message: string) => {
  return res.status(500).send({
    success: false,
    message: message,
  });
};

export const unAuthorizedResponse = (res: Response, message: string) => {
  return res.status(401).send({
    success: false,
    message: message,
  });
};

export const forbiddenResponse = (res: Response, message: string) => {
  return res.status(403).send({
    success: false,
    message: message,
  });
};

export const notFoundResponse = (res: Response, message?: string) => {
  return res.status(404).send({
    success: false,
    message: message,
  });
};
