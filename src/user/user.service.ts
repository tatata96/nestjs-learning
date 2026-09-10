import { Injectable, NotFoundException } from '@nestjs/common';
import { LoggerService } from './user.logger.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { NotFoundError } from 'rxjs';

// services are a type of a Provider

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable()
export class UserService {
  constructor(private readonly logger: LoggerService) {}

  // normally database call is made here
  private users: User[] = [
    {
      id: 1,
      name: 'Tamara Doe',
      email: 'john.doe@example.com',
    },
    {
      id: 2,
      name: 'Simay Doe',
      email: 'jane.doe@example.com',
    },
  ];

  //fetch logic lives in the service
  findAllUsers(name: string = '') {
    this.logger.log('Finding all users');

    return this.users.filter((user) =>
      user.name.toLowerCase().includes(name.toLowerCase()),
    );
  }

  findOneUser(id: number) {
    this.logger.log(`Finding user with id: ${id}`);

    const user = this.users.find((user) => user.id === id);

    if (!user) {
      // 404
      throw new NotFoundException('user not found');
    }

    return user;
  }

  createUser(dto: CreateUserDto) {
    this.logger.log(`Adding new user: ${dto.name}`);

    const newId = this.users.length + 1;

    const newUser = {
      id: newId,
      name: dto.name,
      email: dto.email,
    };

    this.users.push(newUser);

    return newUser;
  }

  updateUser(id: number, dto: UpdateUserDto) {
    this.logger.log(`Updating user with id: ${id}`);

    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return null;
    }

    const updatedUser = {
      ...this.users[userIndex],
      ...dto,
    };

    this.users[userIndex] = updatedUser;

    return updatedUser;
  }

  deleteUser(id: number) {
    this.logger.log(`Deleting user with id: ${id}`);

    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return null;
    }

    const [deletedUser] = this.users.splice(userIndex, 1);

    return deletedUser;
  }
}
