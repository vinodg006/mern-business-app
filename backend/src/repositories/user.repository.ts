import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Schema as MongooseSchema } from 'mongoose';
import { Tenant } from 'src/entities/tenant.entity';
import { UpdateUserDto } from 'src/modules/user/dto/updateUser.dto';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../modules/user/dto/createUser.dto';
import * as bcrypt from 'bcrypt';

export class UserRepository {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>, @InjectModel(Tenant.name) private readonly tenantModel: Model<Tenant>) { }

    async createUser(createUserDto: CreateUserDto, session: ClientSession) {
        let user = await this.getUserByEmail(createUserDto.email);

        if (user) {
            throw new ConflictException('User already exists');
        }

        let client = new this.tenantModel();

        try {
            client = await client.save({ session });
            // user.tenant_id = client.id;
        } catch (error) {
            throw new InternalServerErrorException('Error al consultar la BD', error);
        }

        const saltOrRounds = await bcrypt.genSalt();
        const password = createUserDto.password;
        const hash = await bcrypt.hash(password, saltOrRounds);

        user = new this.userModel({
            name: createUserDto.name,
            email: createUserDto.email,
            role: createUserDto.role,
            password: hash,
            tenant_id: client.id
        });

        try {
            user = await user.save({ session });


        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!user) {
            throw new ConflictException('User not created');
        }

        return user;
    }

    async getUserById(id: MongooseSchema.Types.ObjectId) {
        let user;
        try {
            user = await this.userModel.findById({ _id: id });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    async getUserByEmail(email: string) {
        let user;
        try {
            user = await this.userModel.findOne({ email }).exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        return user;
    }

    async updateUser(updateUser: UpdateUserDto, session: ClientSession) {
        const actualDate = new Date();
        actualDate.toUTCString();

        const updateData = {
            ...updateUser,
            updatedAt: actualDate,
        };

        let product;
        try {
            product = await this.userModel
                .findOneAndUpdate({ _id: updateUser.id }, updateData, {
                    new: true,
                })
                .session(session)
                .exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!product) {
            throw new ConflictException('Error trying to update product');
        }

        return product;
    }
}
