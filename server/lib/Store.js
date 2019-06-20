//store.js
const Redis = require("ioredis");
const { Store } = require("koa-session2");
class RedisStore extends Store{
    constructor({ host = "127.0.0.1", password = "", port = 6379, family = 4 } = {}) {
        super();
        this.redis = new Redis({
            port,          // Redis port
            host,   // Redis host
            family: 4,           // 4 (IPv4) or 6 (IPv6)
            password,
            db: 0
        });
    }

    async get(sid, ctx) {
        let data = await this.redis.get(`SESSION:${sid}`);
        return JSON.parse(data);
    }
 
    async set(session, { sid =  this.getID(24), maxAge = 86400000 } = {}, ctx) {
        try {
            // Use redis set EX to automatically drop expired sessions
            await this.redis.set(`SESSION:${sid}`, JSON.stringify(session), 'EX', maxAge / 1000);
        } catch (e) {}
        return sid;
    }
 
    async destroy(sid, ctx) {
        return await this.redis.del(`SESSION:${sid}`);
    }
}

module.exports = RedisStore;