import { Logger } from '../utils/logger.utils.js'
import { permissionService } from '../service/permission.service.js'

class PermissionController {
	async getPermission(req, res, next) {
		try {
			const permissionId = req.params.id
			const permission = await permissionService.getPermission(permissionId)
			Logger.info(`Permission id:${permissionId} was successfully received`,'permission.controller',`${req.ip}`,'DONE','v')
			res.json({permission, message: `Разрешение id:${permissionId} было успешно получено`})
		} catch (err) {
			Logger.error('Get permission', 'permission.controller', `${req.ip}`, err, 'ERROR')
			next(err)
		}
	}

	async getAllPermissions(req, res, next) {
		try {
			const permissions = await permissionService.getAllPermissions()
			Logger.info(`All permissions were successfully received`,'permission.controller',`${req.ip}`,'DONE','v')
			res.json({permissions, message: `Все разрешения были успешно получены`})
		} catch (err) {
			Logger.error('Get all permissions', 'permission.controller', `${req.ip}`, err, 'ERROR')
			next(err)
		}
	}
}

export const permissionController = new PermissionController()