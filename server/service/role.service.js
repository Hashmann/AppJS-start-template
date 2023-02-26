import RoleModel from '../models/Role.js'
import { ApiError } from '../exceptions/api.error.js'
import { Logger } from '../utils/logger.utils.js'

class RoleService {
	async create(title) {
		const role = await RoleModel.findOne({title})
		if (role) {
			// Logger.warning(`The role: ${title} already exists`,'','','')
			throw ApiError.BadRequest(`Такая роль: ${title} уже существует`)
		}
		const newRole = await RoleModel.create({title})
		return newRole
		// return await RoleModel.create({title})
	}

	async update(roleId, updateRole) {
		//TODO вынести в отдельную функцию ???нужна ли эта проверка???
		if (roleId.length < 24 || roleId.length > 24) {
			throw ApiError.BadRequest(`Недопустимый идентификатор`)
		}
		//TODO END
		const roleById = await RoleModel.findById(roleId)
		if (!roleById) {
			throw ApiError.BadRequest(`Такой роли не существует`)
		}
		await RoleModel.updateOne({
			_id: roleId,
		},{
			title: updateRole.title,
			description: updateRole.description,
		})
	}

	async remove(roleId) {
		if (roleId.length < 24 || roleId.length > 24) {
			throw ApiError.BadRequest(`Недопустимый идентификатор`)
		}
		const roleById = await RoleModel.findById(roleId)
		if (!roleById) {
			throw ApiError.BadRequest(`Такой роли не существует`)
		}
		await RoleModel.findOneAndDelete(roleId)
	}

	async getRole (roleId) {
		if (roleId.length < 24 || roleId.length > 24) {
			throw ApiError.BadRequest(`Недопустимый идентификатор`)
		}
		const roleById = await RoleModel.findById(roleId)
		if (!roleById) {
			throw ApiError.BadRequest(`Такой роли не существует`)
		}
		return roleById
	}

	async getAllRoles () {
		const roles = await RoleModel.find()
		return roles
	}
}

export const roleService = new RoleService()