import { ApiError } from '../exceptions/api.error.js'
import { Logger } from '../utils/logger.utils.js'
import { userService } from '../service/user.service.js'
import { validationResult } from 'express-validator'

class UserController {
  async register(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.UnprocessableEntity('Validation error', errors.array()))
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
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.UnprocessableEntity('Validation error', errors.array()))
      }
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
        return next(ApiError.UnprocessableEntity('Validation error', errors.array()))
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

  async likeUser(req, res, next) {
    try {
      const likedUserId = req.params.id
      const likesUserId = req.user.id
      const user = await userService.likeUser(likedUserId, likesUserId)
      Logger.info(`User id:${likesUserId} likes the user ${likedUserId}`,'user.controller',`${req.ip}`,'DONE','v')
      res.json({user, message: `Вам нравиться пользователь ${likedUserId}`})
    } catch (err) {
      Logger.error('Like the user', 'user.controller', `${req.ip}`, err, 'ERROR')
      next(err)
    }
  }

  async unlikeUser(req, res, next) {
    try {
      const unlikedUserId = req.params.id
      const unlikesUserId = req.user.id
      const user = await userService.unlikeUser(unlikedUserId, unlikesUserId)
      Logger.info(`The User id:${unlikesUserId} removed the "like" from the User id:${unlikedUserId}`,'user.controller',`${req.ip}`,'DONE','v')
      res.json({user, message: `Вы сняли отметку "нравиться" у пользователя ${unlikedUserId}`})
    } catch (err) {
      Logger.error('Unlike the user', 'user.controller', `${req.ip}`, err, 'ERROR')
      next(err)
    }
  }

  async dislikeUser(req, res, next) {
    try {
      const dislikedUserId = req.params.id
      const dislikesUserId = req.user.id
      const user = await userService.dislikeUser(dislikedUserId, dislikesUserId)
      Logger.info(`User id:${dislikesUserId} dislikes the user ${dislikedUserId}`,'user.controller',`${req.ip}`,'DONE','v')
      res.json({user, message: `Вам не нравиться пользователь ${dislikedUserId}`})
    } catch (err) {
      Logger.error('Dislike the user', 'user.controller', `${req.ip}`, err, 'ERROR')
      next(err)
    }
  }

  async undislikeUser(req, res, next) {
    try {
      const undislikedUserId = req.params.id
      const undislikesUserId = req.user.id
      const user = await userService.undislikeUser(undislikedUserId, undislikesUserId)
      Logger.info(`The User id:${undislikesUserId} removed the "dislike" from the User id:${undislikedUserId}`,'user.controller',`${req.ip}`,'DONE','v')
      res.json({user, message: `Вы сняли отметку "не нравиться" у пользователя ${undislikedUserId}`})
    } catch (err) {
      Logger.error('Undislike the user', 'user.controller', `${req.ip}`, err, 'ERROR')
      next(err)
    }
  }

  async updateUserData(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.UnprocessableEntity('Validation error', errors.array()))
      }
      const updateUserData = {...req.body}
      const userId = req.params.id
      const userData = await userService.updateUserData(userId, updateUserData)
      Logger.info('User data updated', 'user.controller', `${req.ip}`, 'DONE', 'v')
      res.json({userData, message: 'Данные пользователя обновлены'})
    } catch (err) {
      Logger.error('User update data', 'user.controller', `${req.ip}`, err, 'ERROR')
      next(err)
    }
  }

  async getUserData(req, res, next) {
    try {
      const userId = req.params.id
      const userData = await userService.getUserData(userId)
      Logger.info('User data received', 'user.controller', `${req.ip}`, 'DONE', 'v')
      res.json({userData, message: 'Данные пользователя получены'})
    } catch (err) {
      Logger.error('User data received', 'user.controller', `${req.ip}`, err, 'ERROR')
      next(err)
    }
  }

  async getUserStats(req, res, next) {
    try {
      const userId = req.params.id
      const userStats = await userService.getUserStats(userId)
      Logger.info('User stats received', 'user.controller', `${req.ip}`, 'DONE', 'v')
      res.json({userStats, message: 'Статистика пользователя получена'})
    } catch (err) {
      Logger.error('User stats received', 'user.controller', `${req.ip}`, err, 'ERROR')
      next(err)
    }
  }

  async issueBan(req, res, next) {
    try {
      const userId = req.params.id
      const banIssuedUserId = req.user.id
      const banData = {...req.body}
      const userBan = await userService.issueBan(userId, banIssuedUserId, banData)
      Logger.info('User ban issued', 'user.controller', `${req.ip}`, 'DONE', 'v')
      res.json({userBan, message: 'Выдан бан пользователю'})
    } catch (err) {
      Logger.error('User ban issued', 'user.controller', `${req.ip}`, err, 'ERROR')
      next(err)
    }
  }

  async getUserBan(req, res, next) {
    try {
      const banId = req.params.banId
      const userStats = await userService.getUserBan(banId)
      Logger.info('The user ban data has been received', 'user.controller', `${req.ip}`, 'DONE', 'v')
      res.json({userStats, message: 'Данные о бане пользователя получены'})
    } catch (err) {
      Logger.error('User ban data', 'user.controller', `${req.ip}`, err, 'ERROR')
      next(err)
    }
  }

  async getUserBans(req, res, next) {
    try {
      const userId = req.params.id
      const userStats = await userService.getUserBans(userId)
      Logger.info('The user bans data has been received', 'user.controller', `${req.ip}`, 'DONE', 'v')
      res.json({userStats, message: 'Данные о всех банах пользователя получены'})
    } catch (err) {
      Logger.error('User bans data', 'user.controller', `${req.ip}`, err, 'ERROR')
      next(err)
    }
  }

  async updateUserBan(req, res, next) {
    try {
      const banId = req.params.id
      const banData = {...req.body}
      const updateBan = await userService.updateUserBan(banId, banData)
      Logger.info('The user ban data has been updated', 'user.controller', `${req.ip}`, 'DONE', 'v')
      res.json({updateBan, message: 'Данные о бане пользователя обновлены'})
    } catch (err) {
      Logger.error('User ban data update', 'user.controller', `${req.ip}`, err, 'ERROR')
      next(err)
    }
  }
}

export const userController = new UserController()