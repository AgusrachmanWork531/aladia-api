import { Injectable, OnModuleInit } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class CacheService implements OnModuleInit {
    private redis: Redis;

    onModuleInit() {
        this.redis = new Redis({
            host: process.env.REDIS_HOST || 'localhost',
            port: Number(process.env.REDIS_PORT || 6379),
            password: process.env.REDIS_PASSWORD || '',
            db: Number(process.env.REDIS_DB || 0),
        });
    }
    
    async set(key: string, value: any, ttl: number = 60): Promise<void> {
        await this.redis.set(key, JSON.stringify(value), 'EX', ttl);
    }

    async get<T = any>(key: string): Promise<T | null> {
        const data = await this.redis.get(key);
        return data ? (JSON.parse(data) as T) : null;
    }

    async del(key: string): Promise<void> {
        await this.redis.del(key);
    }

    async reset(): Promise<void> {
        await this.redis.flushdb();
    }

}
