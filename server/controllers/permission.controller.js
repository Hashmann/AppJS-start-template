import { ApiError } from '../exceptions/api.error.js'
import { Logger } from '../utils/logger.utils.js'
import { permissionService } from '../service/permission.service.js'
import { validationResult } from 'express-validator'

class PermissionController {
	async create(req, res, next) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest('Validation error', errors.array()))
			}
			const {title} = req.body
			const permission = await permissionService.create(title.toUpperCase())
			// Logger.info(`Permission: ${title.toUpperCase()} was successfully created`,'permission.controller',`${req.ip}`,'DONE','v')
			res.json({permission, message: `Разрешение: ${title.toUpperCase()} было успешно создано`})
		} catch (err) {
			Logger.error('Permission create', 'permission.controller', `${req.ip}`, err, 'ERROR')
			next(err)
		}
	}

	async update(req, res, next) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest('Validation error', errors.array()))
			}
			const permissionId = req.params.id
			//TODO перенести в сервис?!
			const updatePermission = {
				title: req.body.title.toUpperCase(),
				description: req.body.description
			}
			const permission = await permissionService.update(permissionId, updatePermission)
			// Logger.info(`Permission id:${permissionId} has been successfully updated`,'permission.controller',`${req.ip}`,'DONE','v')
			res.json({message: `Разрешение id:${permissionId} было успешно обновлено`})
		} catch (err) {
			Logger.error('Permission update', 'permission.controller', `${req.ip}`, err, 'ERROR')
			next(err)
		}
	}

	async remove(req, res, next) {
		try {
			const permissionId = req.params.id
			const permission = await permissionService.remove(permissionId)
			// Logger.info(`Permission id:${permissionId} has been successfully deleted`,'permission.controller',`${req.ip}`,'DONE','v')
			res.json({message: `Разрешение id:${permissionId} было успешно удалено`})
		} catch (err) {
			Logger.error('Permission delete', 'permission.controller', `${req.ip}`, err, 'ERROR')
			next(err)
		}
	}

	async getPermission(req, res, next) {
		try {
			const permissionId = req.params.id
			const permission = await permissionService.getPermission(permissionId)
			// Logger.info(`Permission id:${permissionId} was successfully received`,'permission.controller',`${req.ip}`,'DONE','v')
			res.json({permission, message: `Разрешение id:${permissionId} было успешно получено`})
		} catch (err) {
			Logger.error('Get permission', 'permission.controller', `${req.ip}`, err, 'ERROR')
			next(err)
		}
	}

	async getAllPermissions(req, res, next) {
		try {
			const permissions = await permissionService.getAllPermissions()
			// Logger.info(`All permissions were successfully received`,'permission.controller',`${req.ip}`,'DONE','v')
			res.json({permissions, message: `Все разрешения были успешно получены`})
		} catch (err) {
			Logger.error('Get all permissions', 'permission.controller', `${req.ip}`, err, 'ERROR')
			next(err)
		}
	}
}

export const permissionController = new PermissionController()