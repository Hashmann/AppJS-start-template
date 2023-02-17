import { userService } from '../service/user.service.js'
import { Logger } from '../utils/logger.utils.js'
import UserModel from '../models/User.js'

class UserController {
  async register(req, res, next) {
    try {
      const { email, password } = req.body
      const userData = await userService.register(email, password)
      res.cookie('refresh_token', userData.refreshToken, {maxAge: 30 * 24 * 60 * 1000, httpOnly: true})
      Logger.info(`User ${email} created`,'',`${req.ip}`,'DONE','v')
      return res.json({...userData, message: `Пользователь ${email} был успешно зарегистрирован`})
    } catch (err) {
      Logger.error('Registration Error', 'user-controller',`${req.ip}`,err,'')
      next(err)
    }
  }

  async login(req, res, next) {
    try {

    } catch (err) {
      next(err)
    }
  }

  async logout(req, res, next) {
    try {

    } catch (err) {
      next(err)
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link
      const user = await userService.activate(activationLink)
      Logger.info(`User ${req.email} activated account`, '',`${req.ip}`, 'DONE', 'v')
      return res.redirect(process.env.CLIENT_URL)
    } catch (err) {
      Logger.error('', 'user-controller', `${req.ip}`, err, '')
      next(err)
    }
  }

  async refresh(req, res, next) {
    try {

    } catch (err) {
      next(err)
    }
  }

  async getUsers(req, res, next) {
    try {
      res.json(['123', '456'])
    } catch (err) {
      next(err)
    }
  }

  async testGetRequest(req, res, next) {
    try {
      res.json({message: 'Get test request - OK'})
    } catch (err) {
      next(err)
    }
  }
  async testPostRequest(req, res, next) {
    try {
      const {email, password} = req.body
      // const user = await UserModel.create({email, password})
      res.json({email: email, password: password})
    } catch (err) {
      next(err)
    }
  }
}

export const userController = new UserController()