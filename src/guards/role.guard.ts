import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class RoleGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // get access to request
    const request = context.switchToHttp().getRequest<Request>();
    const role = request.headers.get('role');

    if (role !== 'admin') {
      throw new UnauthorizedException(
        'You are not allowed to perform this action',
      );
    }

    return true;
  }
}
