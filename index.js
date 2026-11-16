import grcpServer from './grpc-server/index.js'
import { startCacheServer } from './cache/redis.js'

await startCacheServer()
grcpServer()