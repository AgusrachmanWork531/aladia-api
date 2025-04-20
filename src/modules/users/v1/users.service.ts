import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/users.schema';
import { CacheService } from 'src/cache/cache.service';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly cacheService: CacheService,
    ) {}

    private users = [];

    async create(createUserDto: CreateUserDto) {
        const createdUser = new this.userModel(createUserDto);
        await this.cacheService.del('users'); // Clear the cache when a new user is created
        return createdUser.save();
    }

    async findAll() {
        const cachedUsers = await this.cacheService.get('users');
        if (cachedUsers) {
            return cachedUsers;
        }
        const users = await this.userModel.find().exec();
        await this.cacheService.set('users', users);
        return users;
    }

    async findOne(id: number) {
        const user = await this.userModel.findById(id).exec();
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
        if (!updatedUser) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        await this.cacheService.del('users'); // Clear the cache when a user is updated
        return updatedUser;
    }

    async remove(id: number) {
        const deleted = await this.userModel.findByIdAndDelete(id).exec();
        if (!deleted) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        await this.cacheService.del('users'); // Clear the cache when a user is deleted
        return deleted;
    }
}
