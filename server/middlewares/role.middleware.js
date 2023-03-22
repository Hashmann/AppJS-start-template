import UserModel from '../models/User.js'
import { ApiError } from '../exceptions/api.error.js'
import { Logger } from '../utils/logger.utils.js'
import { tokenService } from '../service/token.service.js'
import * as dotenv from 'dotenv'

dotenv.config({ path: `.env${process.env.NODE_ENV}` })

export default function (roles){
	return async function (req, res, next) {
		if (req.method === 'OPTIONS') {
			next()
		}
		try {
			const accessToken = await tokenService.getHeaderAccessToken(req)
			const decodedToken = await tokenService.decodeToken(accessToken)
			const userId = decodedToken.id
			const user = await UserModel.findOne({_id: userId})
			const userRoles = user.roles
			let hasRole = false
			userRoles.forEach(role => {
				if (roles.includes(role)) {
					hasRole = true
				}
			})
			if (!hasRole) {
				Logger.error('Roles does not match', 'role.middleware', `${req.ip}`, '', 'ACCESS DENIED')
				return next(ApiError.Forbidden())
			}
			Logger.info('Roles is valid', 'role.middleware', `${req.ip}`, 'ACCESS', 'v')
			next()
		} catch (err) {
			Logger.error('Roles error', 'role.middleware', `${req.ip}`, err, 'ERROR')
			return next(ApiError.UnauthorizedError())
		}
	}
}