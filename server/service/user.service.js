import bcrypt from 'bcrypt'
import UserModel from '../models/User.js'
import RoleModel from '../models/Role.js'
import { mailService } from './mail.service.js'
import { tokenService } from './token.service.js'
import { v4 as uuidv4 } from 'uuid'
import { ApiError } from '../exceptions/api.error.js'
import { Logger } from '../utils/logger.utils.js'
import { UserDto } from '../dtos/user.dto.js'
import { UserUpdateDto } from '../dtos/user.update.dto.js'

class UserService {
  // Registration account
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

  // Activation account
  async activate(activationLink){
    const user = await UserModel.findOne({activationLink})
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
      activationLink: null,
      roles: ['USER'],
    })
    return user
  }

  // Log in
  async login(email, password) {
    const user = await UserModel.findOne({email})
    if (!user) {
      throw ApiError.BadRequest('Пользователь с таким email не найден')
    }
    const isPassEquals = await bcrypt.compare(password, user.password)
    if (!isPassEquals) {
      throw ApiError.BadRequest('Неверный логин или пароль')
    }
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({...userDto})
    await tokenService.saveToken(userDto.id, (await tokens).refreshToken)
    return {
      user: userDto,
      accessToken: (await tokens).accessToken,
      refreshToken: (await tokens).refreshToken,
    }
  }

  // Log out
  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken)
    return token
  }

  // Update user
  async update(userId, updateData) {
    const userById = await UserModel.findById(userId)
    if (!userById) {
      throw ApiError.BadRequest('Пользователь не найден')
    }
    const user = await UserModel.findOneAndUpdate({email: userById.email}, {...updateData})
    const userDto = new UserUpdateDto(user)
    const updatedUser = await UserModel.findById(userById)
    const updatedUserDto = new UserUpdateDto(updatedUserDto)
    return {
      before: {userDto},
      after: {updatedUserDto}
    }
  }

  async remove(userId) {
    if (userId.length < 24 || userId.length > 24) {
      throw ApiError.BadRequest(`Недопустимый идентификатор`)
    }
    const userById = await RoleModel.findById(userId)
    if (!userById) {
      throw ApiError.BadRequest(`Такого пользователя не существует`)
    }
    await RoleModel.findOneAndDelete(userId)
  }

  // Refresh Token
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError()
    }
    const userData = await tokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await tokenService.findToken(refreshToken)
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError()
    }
    const user = await UserModel.findById(userData.id)
    //TODO вынести в отдельную функцию
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({...userDto})
    await tokenService.saveToken(userDto.id, (await tokens).refreshToken)
    return {
      user: userDto,
      accessToken: (await tokens).accessToken,
      refreshToken: (await tokens).refreshToken,
    }
    //TODO END
  }

  // Get all users
  async getAllUsers() {
    const users = await UserModel.find()
    // console.log('users', users)
    return users
  }

  // Get user by ID
  async getUser(userId) {
    const user = await UserModel.findOne({_id: userId})
    return user
  }
}

export const userService = new UserService()