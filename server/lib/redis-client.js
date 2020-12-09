var redis = require("redis");
var { promisify } = require("util");
var client = redis.createClient(process.env.REDIS_URL);

console.log("Connecting to Redis");

module.exports = {
  ...client,
  getAsync: promisify(client.get).bind(client),
  setAsync: promisify(client.set).bind(client),
  keysAsync: promisify(client.keys).bind(client),
};
