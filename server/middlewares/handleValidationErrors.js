import { validationResult } from 'express-validator'
import { Logger } from '../utils/logger.js'

export default (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()){
    Logger.error('Validation Error', 'MW handleValidationErrors',`${req.ip}`,errors,'')
    return res.status(400).json(errors.array())
  }
  Logger.info('Validation worked','MW handleValidationErrors',`${req.ip}`,'DONE','v')
  next()
}