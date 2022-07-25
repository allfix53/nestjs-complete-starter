import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

export class HttpsExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log(exception.getResponse);
    console.log(exception.getStatus);
    console.log(exception.getResponse);

    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();

    response.status(exception.getStatus()).send({
      status: exception.getStatus(),
      message: exception.getResponse(),
    });
  }
}
