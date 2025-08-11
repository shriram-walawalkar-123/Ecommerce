const redis = require('redis');

const client = redis.createClient({
    url: process.env.REDIS_URL
});

client.on('error', (err) => console.error('Redis Client Error', err));

(async () => {
    await client.connect();
    console.log('Connected to Redis');
})();

module.exports = client;
