import { ApiError } from '../exceptions/api.error.js'
import { Logger } from '../utils/logger.utils.js'
import { roleService } from '../service/role.service.js'
import { validationResult } from 'express-validator'

class RoleController {
	async create(req, res, next) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest('Validation error', errors.array()))
			}
			const {title} = req.body
			const role = await roleService.create(title.toUpperCase())
			Logger.info(`Role: ${title.toUpperCase()} was successfully created`,'',`${req.ip}`,'DONE','v')
			res.json({role, message: `Роль: ${title.toUpperCase()} была успешно создана`})
		} catch (err) {
			Logger.error('Role Error', 'role.controller', `${req.ip}`, err, '')
			next(err)
		}
	}

	async update(req, res, next) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest('Validation error', errors.array()))
			}
			const roleId = req.params.id
			//TODO перенести в сервис?!
			const updateRole = {
				title: req.body.title.toUpperCase(),
				description: req.body.description
			}
			const role = await roleService.update(roleId, updateRole)
			Logger.info(`Role id:${roleId} has been successfully updated`,'',`${req.ip}`,'DONE','v')
			res.json({message: `Роль id:${roleId} была успешно обновлена`})
		} catch (err) {
			Logger.error('Role Error', 'role.controller', `${req.ip}`, err, '')
			next(err)
		}
	}

	async remove(req, res, next) {
		try {
			const roleId = req.params.id
			const role = await roleService.remove(roleId)
			Logger.info(`Role id:${roleId} has been successfully deleted`,'',`${req.ip}`,'DONE','v')
			res.json({message: `Роль id:${roleId} была успешно удалена`})
		} catch (err) {
			Logger.error('Role Error', 'role.controller', `${req.ip}`, err, '')
			next(err)
		}
	}

	async getRole(req, res, next) {
		try {
			const roleId = req.params.id
			const role = await roleService.getRole(roleId)
			Logger.info(`Role id:${roleId} was successfully received`,'',`${req.ip}`,'DONE','v')
			res.json({role, message: `Роль id:${roleId} была успешно получена`})
		} catch (err) {
			Logger.error('Role Error', 'role.controller', `${req.ip}`, err, '')
			next(err)
		}
	}

	async getAllRoles(req, res, next) {
		try {
			const roles = await roleService.getAllRoles()
			Logger.info(`All roles were successfully received`,'',`${req.ip}`,'DONE','v')
			res.json({roles, message: `Все роли были успешно получены`})
		} catch (err) {
			Logger.error('Role Error', 'role.controller', `${req.ip}`, err, '')
			next(err)
		}
	}
}

export const roleController = new RoleController()