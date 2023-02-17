import UserModel from '../models/User.js'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import { mailService } from './mail.service.js'
import { tokenService } from './token.service.js'
import { UserDto } from '../dtos/user.dto.js'
import { ApiError } from '../exceptions/api.error.js'
import { Logger } from '../utils/logger.utils.js'

class UserService{
  async register(email, password) {
    const candidate = await UserModel.findOne({email})
    if (candidate) {
      Logger.warning(`Пользователь с email: ${email} уже существует`,'','','')
      throw ApiError.BadRequest(`Пользователь с email: ${email} уже существует`)
    }
    const hashPassword = await bcrypt.hash(password,3)
    const activationLink = uuidv4()
    const user = await UserModel.create({email, password: hashPassword, activationLink})
    await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`)

    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({...userDto})
    await tokenService.saveToken(userDto.id, (await tokens).refreshToken)

    // return {tokens: {accessToken: (await tokens).accessToken, refreshToken: (await tokens).refreshToken}, user: userDto}
    // return {...tokens, user: userDto}
    return {
      user: userDto,
      accessToken: (await tokens).accessToken,
      refreshToken: (await tokens).refreshToken,
    }
  }

  async activate(activationLink){
    const user = UserModel.findOne({activationLink})
    if (!user) {
      throw ApiError.BadRequest('Некоррктная ссылка активации')
    }
    // user.isActivated = true
    // await user.save()
    await UserModel.updateOne({
      activationLink: activationLink,
    },{
      isActivated: true,
      activatedAt: (new Date()).toISOString().slice(0,50),
    })
    return user
  }
}

export const userService = new UserService()