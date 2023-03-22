import PermissionModel from '../models/Permission.js'
import { ApiError } from '../exceptions/api.error.js'
import { verifyIdLength } from '../utils/utils.js'

class PermissionService {
	async getPermission (permissionId) {
		verifyIdLength(permissionId)
		const permissionById = await PermissionModel.findById(permissionId)
		if (!permissionById) throw ApiError.BadRequest(`Такого разрешения не существует`)
		return permissionById
	}

	async getAllPermissions () {
		const permissions = await PermissionModel.find()
		return permissions
	}
}

export const permissionService = new PermissionService()