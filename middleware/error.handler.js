import logger from "../utils/logger"

const errorHandler = (err, req, res) => {
  logger.error(err.stack)
  res.status(err.status || 500).json({message: err.message || "internal server error"})
}

export default errorHandler