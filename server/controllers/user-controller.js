import { userService } from '../service/user-service.js'
import { Logger } from '../utils/logger.js'

class UserController {
  async register(req, res, next) {
    try {
      const {email, password} = req.body
      const userData = await userService.register(email, password)
      res.cookie('refresh_token', userData.refreshToken, {maxAge: 30 * 24 * 60 * 1000, httpOnly: true})
      Logger.info(`User ${email} created`,'',`${req.ip}`,'DONE','v')
      return res.json({...userData, message: `Пользователь ${email} был успешно зарегистрирован`})
    } catch (err) {
      logger('err', 'Registration Error', err, '', `${req.ip}`, '', 'x')
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
      // console.log(user)
      Logger.info(`User ${req.email} activated account`, '',`${req.ip}`, 'DONE', 'v')
      return res.redirect(process.env.CLIENT_URL)
    } catch (err) {
      logger('err', '', err, '',`${req.ip}`, '', 'x')
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
}

export const userController = new UserController()