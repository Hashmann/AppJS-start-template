import { ApiError } from '../exceptions/api.error.js'
import { Logger } from '../utils/logger.utils.js'
import { userService } from '../service/user.service.js'
import { validationResult } from 'express-validator'

class UserController {
  async register(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation error', errors.array()))
      }
      const { email, password } = req.body
      const userData = await userService.register(email, password)
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 1000, httpOnly: true})
      Logger.info(`User ${email} created`,'',`${req.ip}`,'DONE','v')
      return res.json({...userData, message: `Пользователь был успешно зарегистрирован`})
    } catch (err) {
      Logger.error('User registration', 'user.controller',`${req.ip}`, err,'ERROR')
      next(err)
    }
  }

  async login(req, res, next) {
    try {
      const {email, password} = req.body
      const userData = await userService.login(email, password)
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 1000, httpOnly: true})
      Logger.info(`User ${email} logged in`,'',`${req.ip}`,'DONE','v')
      return res.json({...userData, message: `Успешная аутентификация`})
    } catch (err) {
      Logger.error('User login', 'user.controller', `${req.ip}`, err, 'ERROR')
      next(err)
    }
  }

  async logout(req, res, next) {
    try {
      const {refreshToken} = req.cookies
      const token = await userService.logout(refreshToken)
      res.clearCookie('refreshToken')
      Logger.info('User logout', 'user.controller', `${req.ip}`, 'DONE', 'v')
      return res.json({token, message: `Успешный выход из системы`})
    } catch (err) {
      Logger.error('User logout', 'user.controller', `${req.ip}`, err, 'ERROR')
      next(err)
    }
  }

  async update(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation error', errors.array()))
      }
      const updateData = req.body
      const userId = req.params.id
      const { user, updatedUser } = await userService.update(userId, updateData)
      // Logger.info('User updated', 'user.controller', `${req.ip}`, 'DONE', 'v')
      res.json({user: { user }, update: { updatedUser }, message: 'Данные пользователя обновлены'})
    } catch (err) {
      Logger.error('User update', 'user.controller', `${req.ip}`, err, 'ERROR')
      next(err)
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link
      const user = await userService.activate(activationLink)
      Logger.info(`User ${user.email} activated account`, 'user.controller',`${req.ip}`, 'DONE', 'v')
      return res.redirect(process.env.CLIENT_URL)
    } catch (err) {
      Logger.error('Activate email', 'user.controller', `${req.ip}`, err, 'ERROR')
      next(err)
    }
  }

  async refresh(req, res, next) {
    try {
      const {refreshToken} = req.cookies
      const userData = await userService.refresh(refreshToken)
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 1000, httpOnly: true})
      Logger.info(`User refresh token`,'user.controller',`${req.ip}`,'DONE','v')
      return res.json({...userData, message: `Токен был успешно обновлен`})
    } catch (err) {
      Logger.error('Refresh tokens', 'user.controller', `${req.ip}`, err, 'ERROR')
      next(err)
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers()
      return res.json(users)
    } catch (err) {
      Logger.error('Get all users', 'user.controller', `${req.ip}`, err, 'ERROR')
      next(err)
    }
  }

  async getUser(req, res, next) {
    try {
      const userId = req.params.id
      const user = await userService.getUser(userId)
      return res.json(user)
    } catch (err) {
      Logger.error('Get user', 'user.controller', `${req.ip}`, err, 'ERROR')
      next(err)
    }
  }

  async remove(req, res, next) {
    try {
      const userId = req.params.id
      const user = await userService.remove(userId)
      Logger.info(`User id:${userId} has been successfully deleted`,'user.controller',`${req.ip}`,'DONE','v')
      res.json({user, message: `Пользователь id:${userId} был успешно удален`})
    } catch (err) {
      Logger.error('User delete', 'user.controller', `${req.ip}`, err, 'ERROR')
      next(err)
    }
  }
}

export const userController = new UserController()