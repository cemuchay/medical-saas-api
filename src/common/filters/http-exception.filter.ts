import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorResponse } from '../interfaces/error-response.interface';

@Catch() // This catches EVERYTHING
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Determine status code
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Extract the message
    const exceptionResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : { message: (exception as Error).message };

    const message =
      typeof exceptionResponse === 'object'
        ? (exceptionResponse as any).message
        : exceptionResponse;

    const errorBody: ErrorResponse = {
      success: false,
      statusCode: status,
      message: message || 'Internal server error',
      error: HttpStatus[status],
      path: request.url,
      timestamp: new Date().toISOString(),
    };

    // Add personality/debugging for the dev mode you requested
    if (process.env.DEV_MODE === 'true') {
      errorBody.devMessage = 'Something cooked incorrectly in the kitchen! 🍳';
      console.error(
        `[ERROR LOG]: Path: ${request.url} | Message: ${errorBody.message}`,
      );
    }

    response.status(status).json(errorBody);
  }
}
