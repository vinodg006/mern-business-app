import { Injectable } from '@nestjs/common';
import { ClientSession, Schema as MongooseSchema } from 'mongoose';
import { UserRepository } from '../../repositories/user.repository';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) { }

    async createUser(createUserDto: CreateUserDto, session: ClientSession) {
        const createdUser = await this.userRepository.createUser(createUserDto, session);
        return createdUser;
    }

    async getUserById(id: MongooseSchema.Types.ObjectId) {
        return await this.userRepository.getUserById(id);
    }

    async findByEmail(email: string) {
        return await this.userRepository.getUserByEmail(email);
    }

    async updateUser(updateUserDto: UpdateUserDto, session: ClientSession) {
        return await this.userRepository.updateUser(updateUserDto, session);
    }

}
