import { createClient } from 'redis';

const client = createClient();

client.on('error', err => console.log('Redis Client Error', err));

const startCacheServer = async () => {
  try {
  const stats = await client.connect();
  console.info(``)
  } catch (err) { 
    console.error(`Redis connection error: ${err}`) 
  }
}

export {
  startCacheServer
}