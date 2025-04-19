import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/v1/users.module';
import { UsersRepository } from './modules/users/v1/users.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal:true }), // Load environment variables from .env file
    MongooseModule.forRoot(process.env.MONGO_URL), // Connect to MongoDB
    UsersModule
  ],
  controllers: [],
  providers: [UsersRepository],
  exports: [UsersRepository],
})
export class AppModule {}
