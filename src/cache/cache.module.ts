import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';

@Module({
    providers: [CacheService],
    exports: [CacheService], // Export the CacheService so it can be used in other modules
})
export class CacheModule {}
