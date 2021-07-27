import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async findAll() {
    const users = await this.usersRepository.find();
    if(!users)
    {
      throw new NotFoundException("There are no users");
      
    }
    return users;
  }

  async findOne(id: number){
    const user = await this.usersRepository.findOne(id);
    if(!user)
    {
      throw new NotFoundException("No such ID is found");
    }
    return user;
  }

  async save(user: User){
    const userCreated =  this.usersRepository.create(user);
    return this.usersRepository.save(userCreated);
  }

  async remove(id: number){
    const deleteUser = await this.usersRepository.findOne(id);
    return this.usersRepository.remove(deleteUser);
  }

  async updateUser(id: number, user: User)
  {
    const updatedUser = await this.usersRepository.preload(
      {
        id: +id,
      ...user,
    }
    );
    if(!updatedUser)
    {
      throw new NotFoundException("User with this ID not found");
    }
    return this.usersRepository.save(updatedUser);
  }
}
