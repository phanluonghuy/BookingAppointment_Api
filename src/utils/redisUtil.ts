import dotenv from 'dotenv';
import Redis from "ioredis";

dotenv.config();

const REDIS_HOST = process.env.REDIS_HOST || "127.0.0.1";
const REDIS_PORT = process.env.REDIS_PORT || "6379";
const REDIS_PASSWORD = process.env.REDIS_PASSWORD || "";

const redis = new Redis({
    host: REDIS_HOST,
    port: Number(REDIS_PORT),
    password: REDIS_PASSWORD || undefined,
    db: 0,
    retryStrategy: (times) => {
        const delay = Math.min(times * 50, 2000);
        return delay;
    }
});

// Event listeners for Redis connection
redis.on("connect", () => {
    console.log("Connected to Redis server");
});

redis.on("error", (err) => {
    console.error("Redis error: ", err);
});

redis.on("ready", () => {
    console.log("Redis is ready to use");
});

// Get a value from Redis
const getFromRedis = async (key: string): Promise<string | null> => {
    try {
        const value = await redis.get(key);
        return value;
    } catch (err) {
        console.error("Error getting from Redis:", err);
        return null;
    }
};

// Set a value to Redis with an optional expiration time
const setToRedis = async (key: string, value: string, expiration: number = 3600): Promise<void> => {
    try {
        await redis.set(key, value, "EX", expiration);
    } catch (err) {
        console.error("Error setting to Redis:", err);
    }
};

// Increment a value in Redis (useful for counters, queues, etc.)
const incrementInRedis = async (key: string): Promise<number> => {
    try {
        const newValue = await redis.incr(key);
        return newValue;
    } catch (err) {
        console.error("Error incrementing value in Redis:", err);
        return 0;
    }
};

// Delete a key from Redis
const deleteFromRedis = async (key: string): Promise<void> => {
    try {
        await redis.del(key); // Delete the key from Redis
    } catch (err) {
        console.error("Error deleting from Redis:", err);
    }
};

// Check if a key exists in Redis
const existsInRedis = async (key: string): Promise<boolean> => {
    try {
        const exists = await redis.exists(key);
        return exists === 1;
    } catch (err) {
        console.error("Error checking key existence in Redis:", err);
        return false;
    }
};

// Close the Redis connection
const closeRedis = async (): Promise<void> => {
    try {
        await redis.quit();
    } catch (err) {
        console.error("Error closing Redis connection:", err);
    }
};

// Clear all keys in Redis
const clearRedis = async (): Promise<void> => {
    try {
        await redis.flushdb();
    } catch (err) {
        console.error("Error clearing Redis:", err);
    }
};

export default {
    getFromRedis,
    setToRedis,
    incrementInRedis,
    deleteFromRedis,
    existsInRedis,
    closeRedis,
    clearRedis
};
