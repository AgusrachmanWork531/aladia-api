import { OnModuleInit } from '@nestjs/common';
export declare class CacheService implements OnModuleInit {
    private redis;
    onModuleInit(): void;
    set(key: string, value: any, ttl?: number): Promise<void>;
    get<T = any>(key: string): Promise<T | null>;
    del(key: string): Promise<void>;
    reset(): Promise<void>;
}
