//store.js
const Redis = require("ioredis");

class RedisStore {
    constructor({ host = "127.0.0.1", password = "", port = 6379, family = 4 } = {}) {
        this.redis = new Redis({
            port,          // Redis port
            host,   // Redis host
            family: 4,           // 4 (IPv4) or 6 (IPv6)
            password,
            db: 0
        });
    }

    async get(userid) {
        let data = await this.redis.get(`${userid}`);
        return JSON.parse(data);
    }

    async set(userid, value, { maxAge = 86400000 } = {}) {
        try {
            /**
                86400000 24小时
                EX seconds - 设置指定的过期时间，以秒为单位。
                PX 毫秒 - 设置指定的过期时间，以毫秒为单位。
                NX - 仅设置密钥（如果密钥尚不存在）。
                XX - 仅设置密钥（如果已存在）。
             */
            await this.redis.set(`${userid}`, JSON.stringify(value), 'EX', maxAge / 1000);
        } catch (e) {

        }
        return value;
    }

    async destroy(userid) {
        return await this.redis.del(`${userid}`);
    }
}


module.exports = function (options = {}) {

    const redisStore = new RedisStore({ ...options });

    return async (ctx, next) => {
        ctx.store = redisStore;
        await next();
    };
}