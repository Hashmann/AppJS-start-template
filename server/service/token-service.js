import jwt from 'jsonwebtoken'
import TokenModel from '../models/Token.js'

class TokenService{
  async generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, {expiresIn: process.env.JWT_ACCESS_EXPIRES_TIME})
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, {expiresIn: process.env.JWT_REFRESH_EXPIRES_TIME})
    // console.log('accessToken', accessToken)
    // console.log('refreshToken', refreshToken)
    return {
      accessToken,
      refreshToken
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await TokenModel.findOne({user: userId})
    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return tokenData.save()
    }
    // const token = await TokenModel.create({user: userId, refreshToken})
    // return token
    return await TokenModel.create({user: userId, refreshToken})
  }
}

export const tokenService = new TokenService()