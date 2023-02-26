import PermissionModel from '../models/Permission.js'
import { ApiError } from '../exceptions/api.error.js'
import { Logger } from '../utils/logger.utils.js'

class PermissionService {
	async create(title) {
		const permission = await PermissionModel.findOne({title})
		if (permission) {
			// Logger.warning(`The role: ${title} already exists`,'','','')
			throw ApiError.BadRequest(`Такая роль: ${title} уже существует`)
		}
		const newPermission = await PermissionModel.create({title})
		return newPermission
		// return await RoleModel.create({title})
	}

	async update(permissionId, updatePermission) {

	}

	async remove(permissionId) {

	}

	async getPermission (permissionId) {
		if (permissionId.length < 24 || permissionId.length > 24) {
			throw ApiError.BadRequest(`Недопустимый идентификатор`)
		}
		const permissionById = await PermissionModel.findById(permissionId)
		if (!permissionById) {
			throw ApiError.BadRequest(`Такой роли не существует`)
		}
		return permissionById
	}

	async getAllPermissions () {
		const permissions = await PermissionModel.find()
		return permissions
	}
}

export const permissionService = new PermissionService()