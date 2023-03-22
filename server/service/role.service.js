import RoleModel from '../models/Role.js'
import { ApiError } from '../exceptions/api.error.js'
import {
	trimStringObjData,
	verifyIdLength
} from '../utils/utils.js'

class RoleService {
	async create(roleData) {
		const role = await RoleModel.findOne({title: roleData.title})
		if (role) throw ApiError.BadRequest(`Такая роль: ${role.title} уже существует`)
		roleData = trimStringObjData(roleData)
		roleData['title'] = roleData['title'].toUpperCase()
		return await RoleModel.create(roleData)
	}

	async update(roleId, roleData) {
		verifyIdLength(roleId)
		const roleById = await RoleModel.findById(roleId)
		if (!roleById) throw ApiError.BadRequest(`Такой роли не существует`)
		if (roleById.title === 'ADMIN' || roleById.title === 'SUPER-ADMIN') throw ApiError.BadRequest(`Эту роль изменить нельзя`)
		roleData = trimStringObjData(roleData)
		roleData['title'] = roleData['title'].toUpperCase()
		const roleUpdate = await RoleModel.findByIdAndUpdate(roleId, roleData, {returnDocument: 'after'})
			.populate('permissions')
		return roleUpdate
	}

	async remove(roleId) {
		verifyIdLength(roleId)
		const roleById = await RoleModel.findById(roleId)
		if (!roleById) throw ApiError.BadRequest(`Такой роли не существует`)
		if (roleById.title === 'SUPER-ADMIN' ||
			roleById.title === 'ADMIN' ||
			roleById.title === 'MANAGER' ||
			roleById.title === 'USER' ||
			roleById.title === 'GUEST') throw ApiError.BadRequest(`Эту роль удалить нельзя`)
		const roleDelete = await RoleModel.findByIdAndDelete(roleId).populate('permissions')
		return roleDelete
	}

	async getRole (roleId) {
		verifyIdLength(roleId)
		const roleById = await RoleModel.findById(roleId).populate('permissions')
		if (!roleById) throw ApiError.BadRequest(`Такой роли не существует`)
		return roleById
	}

	async getAllRoles () {
		const roles = await RoleModel.find().populate('permissions')
		return roles
	}
}

export const roleService = new RoleService()