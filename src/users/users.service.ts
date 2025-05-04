import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from './user.interface';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [];

  create(createUserDto: CreateUserDto) {
    const newUser: User = {
      ...createUserDto,
      id: this.users.length + 1,
    };
    this.users.push(newUser);
    return newUser;
  }

  findAll(filter?: string, page?: number) {
    let results = this.users;

    if (filter) {
      results = results.filter((user) =>
        user.name.toLowerCase().includes(filter.toLowerCase()),
      );
    }

    const pageSize = 5;
    const start = ((page || 1) - 1) * pageSize;

    return results.slice(start, start + pageSize);
  }

  findOne(id: number) {
    const user = this.users.find((u) => u.id === id);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto): User {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    Object.assign(user, updateUserDto);
    this.users.push(user)
    return user;
  }

  remove(id: number): User[] {
    const index = this.users.findIndex((p) => p.id === id);

    if (index <= -1) {
      throw new NotFoundException('Usuário nao encontrado');
    }

    return this.users.splice(index, 1);
  }
}
