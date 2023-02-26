import UserModel from '../models/User.js'
import RoleModel from '../models/Role.js'
import { ApiError } from '../exceptions/api.error.js'
import { Logger } from '../utils/logger.utils.js'
import { tokenService } from '../service/token.service.js'
import * as dotenv from 'dotenv'

dotenv.config({ path: `.env${process.env.NODE_ENV}` })

export default function (permissions){
	return async function (req, res, next) {
		if (req.method === 'OPTIONS') {
			next()
		}
		try {
			const accessToken = await tokenService.headerAccessToken(req)
			const decodedToken = await tokenService.decodeToken(accessToken)
			const userId = decodedToken.id
			const user = await UserModel.findOne({_id: userId})
			const userRoles = user.roles
			let userPermissions = []
			for (let i = 0; i < userRoles.length; i++) {
				const role = await RoleModel.findOne({title: userRoles[i]})
				const rolePermissions = role.permissions
				for (let j = 0; j < rolePermissions.length; j++) {
					if ( !(userPermissions.includes(rolePermissions[j])) ) {
						userPermissions.push(rolePermissions[j])
					}
				}
			}
			let hasPermission = false
			userPermissions.forEach(permission => {
				if (permissions.includes(permission)) {
					hasPermission = true
				}
			})
			if (!hasPermission) {
				Logger.error('Permissions does not match', 'permissions.middleware', `${req.ip}`, '', 'ACCESS DENIED')
				return next(ApiError.UnauthorizedError())
			}
			Logger.info('Permissions is valid', 'permissions.middleware', `${req.ip}`, 'ACCESS', 'v')
			next()
		} catch (err) {
			Logger.error('Permissions middleware error', 'permissions.middleware', `${req.ip}`, err, 'ACCESS DENIED')
			return next(ApiError.UnauthorizedError())
		}
	}
}