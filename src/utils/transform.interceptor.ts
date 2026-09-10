import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { map, Observable } from 'rxjs';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // get access to response
    const response = context.switchToHttp().getResponse<Response>();
    const statusCode = response.statusCode ?? 200;

    // next.handle() fires the controller and gets result
    // then the attached pipe method that takes a map function(that accepts a data of a type T)
    // transforms that result, and we wrap it in an object and return
    return next.handle().pipe(
      map((data: T) => ({
        statusCode,
        message: 'Success',
        data,
      })),
    );
  }
}
