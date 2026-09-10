// DTO, Data Transfer Object, is a class that is used to transfer data between the client and the server
// it is a way to validate the data that is sent to the server, use class not interface
// interface is are erased at runtime, class is not
//So the create DTO represents the request body
//CreateUserDto = what the client is allowed to send
//User = what your app stores/returns

import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsEmail()
  email: string;
}
