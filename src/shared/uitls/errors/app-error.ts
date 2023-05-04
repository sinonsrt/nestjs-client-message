import { HttpCode, HttpStatus } from '@nestjs/common';

class AppError extends Error {
  public readonly message: string;
  public readonly statusCode: number;

  constructor(message: string, statusCode = HttpStatus.BAD_REQUEST) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

export { AppError };
