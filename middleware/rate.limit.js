import RedisStore from "rate-limit-redis"
import { redisClient } from "../middleware/rate.limiter"
import logger from "../utils/logger"
import { rateLimit } from "express-rate-limit"

const sensitiveEndpointsRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, 
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn(`Sensitive endpoint rate limit exceeded for ${req.ip || req.socket.remoteAddress}`)
    res.status(429).json({ success: false, message: "Too many requests. Try again later"})
  },
  store: new RedisStore({
    sendCommand: (...args) => redisClient.call(...args) 
  })
})

export default sensitiveEndpointsRateLimit