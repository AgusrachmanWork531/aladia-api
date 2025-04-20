import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/users.schema';
import { CacheModule } from 'src/cache/cache.module';

@Module({
  // Import the MongooseModule and register the User schema
  // This allows us to use the User model in our service
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    CacheModule
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], // Export the UsersService so it can be used in other modules
})
export class UsersModule {}
