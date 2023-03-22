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
			const accessToken = await tokenService.getHeaderAccessToken(req)
			const decodedToken = await tokenService.decodeToken(accessToken)
			const userId = decodedToken.id
			const user = await UserModel.findOne({_id: userId})
				.populate({
				path: 'roles',
				populate: {
					path: 'permissions',
					model: 'Permission'
				}
			}).exec()
			const userRoles = []
			for (let role in user.roles) {
				userRoles.push(user.roles[role].title)
			}
			const userPermissions = []
			for (let userRole in userRoles) {
				const role = await RoleModel.findOne({title: userRoles[userRole]}).populate('permissions').exec()
				for (let permission in role.permissions) {
					userPermissions.push(role.permissions[permission].title)
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
				return next(ApiError.Forbidden())
			}
			Logger.info('Permissions is valid', 'permissions.middleware', `${req.ip}`, 'ACCESS', 'v')
			next()
		} catch (err) {
			Logger.error('Permissions error', 'permissions.middleware', `${req.ip}`, err, 'ERROR')
			return next(ApiError.UnauthorizedError())
		}
	}
}