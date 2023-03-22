import jwt from 'jsonwebtoken'
import TokenModel from '../models/Token.js'
import { ApiError } from '../exceptions/api.error.js'
import { Logger } from '../utils/logger.utils.js'
import * as dotenv from 'dotenv'

dotenv.config({ path: `.env${process.env.NODE_ENV}` })

class TokenService {
  // Generate tokens
  async generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: process.env.JWT_ACCESS_EXPIRES_TIME})
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: process.env.JWT_REFRESH_EXPIRES_TIME})
    return {
      accessToken,
      refreshToken
    }
  }

  // Validate access token
  validateAccessToken(accessToken, res) {
    try {
      const validUser = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
      // console.log('validUser', validUser)
      // Logger.info('Access Token', 'token.service', '','VALID', 'v')
      return validUser
    } catch (err) {
      // console.log(`|${err}|`)
      Logger.error('Access Token', 'token.service','', err,'INVALID')
      return null
    }
  }

  // Validate refresh token
  async validateRefreshToken(refreshToken) {
    try {
      const validUser = await jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
      console.log('validUser', validUser)
      return validUser
    } catch (err) {
      Logger.error('Refresh Token', 'token.service','', err,'INVALID')
      return null
    }
  }

  // Decode token
  async decodeToken(token) {
    try {
      if (!token) {
        Logger.error('TOKEN', 'token.service','', '','MISSING')
        return next(ApiError.UnauthorizedError())
      }
      const decodedToken = jwt.decode(token)
      if (!decodedToken) {
        Logger.error('Verification error', 'token.service','', '','ACCESS DENIED')
        return next(ApiError.UnauthorizedError())
      }
      return decodedToken
    } catch (err) {
      Logger.error('Token decode error', 'token.service','', err,'ACCESS DENIED')
      return next(ApiError.UnauthorizedError())
    }
  }

  // Save token in Token table
  async saveToken(userId, refreshToken) {
    try {
      const tokenData = await TokenModel.findOne({user: userId})
      if (tokenData) {
        tokenData.refreshToken = refreshToken
        return tokenData.save()
      }
      // const token = await TokenModel.create({user: userId, refreshToken})
      // return token
      return await TokenModel.create({user: userId, refreshToken})
    } catch (err) {
      Logger.error('Save token error', 'token.service','', err,'DOWN')
    }
  }

  // Delete refresh token in Token table
  async removeToken(refreshToken) {
    try {
      const tokenData = await TokenModel.findOneAndDelete({refreshToken})
      return tokenData
    } catch (err) {
      Logger.error('Remove token error', 'token.service','', err,'DOWN')
    }
  }

  // Find refresh token in Token table
  async findToken(refreshToken) {
    try {
      const tokenData = await TokenModel.findOne({refreshToken})
      return tokenData
    } catch (err) {
      Logger.error('Find token error', 'token.service','', err,'DOWN')
    }
  }

  // Get access token from headers
  async getHeaderAccessToken(req) {
    try {
      if (!req) return next(ApiError.BadRequest('Empty Request'))
      const accessToken = (req.headers.authorization || '').replace(/Bearer\s?/, '')
      return accessToken
    } catch (err) {
      Logger.error('Header access token', 'token.service','', err,'TOKEN ERROR')
      return next(ApiError.UnauthorizedError())
    }
  }
}

export const tokenService = new TokenService()