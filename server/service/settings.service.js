import SettingsModel from '../models/settings/Settings.js'
import SettingsRouteModel from '../models/settings/SettingsRoute.js'
import UserModel from '../models/User.js'
import RoleModel from '../models/Role.js'
import { ApiError } from '../exceptions/api.error.js'
import { trimStringObjData, verifyIdLength } from '../utils/utils.js'

class SettingsService {
	// Update route by ID
	async updateRoute(routeId, userId, routeData) {
		verifyIdLength(routeId)
		verifyIdLength(userId)
		const routeById = await SettingsRouteModel.findById(routeId).lean()
		if (!routeById) throw ApiError.BadRequest(`Такого роута не существует`)
		const userById = await UserModel.findById(userId)
		const superAdminRole = await RoleModel.findOne({title: 'SUPER-ADMIN'}).lean()
		if (!userById || !userById.roles.includes(superAdminRole._id)) throw ApiError.BadRequest(`Такого пользователя не существует или отказано в доступе`)
		routeData = trimStringObjData(routeData)
		const updateRouteData = {
			description: routeData.description,
			accessPermList: routeData.accessPermList,
			accessRoleList: routeData.accessRoleList,
			isCheckAuth: routeData.isCheckAuth,
			isCheckBan: routeData.isCheckBan
		}
		const updateRoute = await SettingsRouteModel.findByIdAndUpdate(routeId, updateRouteData, {returnDocument: 'after'})
		return updateRoute
	}
	// Update settings
	async updateSettings(userId, settingsData) {
		verifyIdLength(userId)
		const userById = await UserModel.findById(userId)
		const superAdminRole = await RoleModel.findOne({title: 'SUPER-ADMIN'}).lean()
		if (!userById || !userById.roles.includes(superAdminRole._id)) throw ApiError.BadRequest(`Такого пользователя не существует или отказано в доступе`)
		settingsData = trimStringObjData(settingsData)
		const updateSettingsData = {
			info: settingsData.info,
			settings: settingsData.settings
		}
		const updateSettings = await SettingsModel.findOneAndUpdate({}, updateSettingsData, {returnDocument: 'after'}).lean()
		return updateSettings
	}
	// Get route by ID
	async getRoute(routeId, userId) {
		verifyIdLength(routeId)
		verifyIdLength(userId)
		const userById = await UserModel.findById(userId)
		const superAdminRole = await RoleModel.findOne({title: 'SUPER-ADMIN'}).lean()
		if (!userById || !userById.roles.includes(superAdminRole._id)) throw ApiError.BadRequest(`Такого пользователя не существует или отказано в доступе`)
		const routeById = await SettingsRouteModel.findById(routeId)
			.populate('accessPermList')
			.populate({
				path: 'accessRoleList',
				populate: [{
					path: 'permissions',
					select: ['title', 'description']
				}, {
					path: 'parentRole'
				}]
			})
			.lean()
		if (!routeById) throw ApiError.BadRequest(`Такой роут не найден`)
		return routeById
	}
	// Get all routes
	async getRoutes(userId) {
		verifyIdLength(userId)
		const userById = await UserModel.findById(userId)
		const superAdminRole = await RoleModel.findOne({title: 'SUPER-ADMIN'}).lean()
		if (!userById || !userById.roles.includes(superAdminRole._id)) throw ApiError.BadRequest(`Такого пользователя не существует или отказано в доступе`)
		const routes = await SettingsRouteModel.find()
			.populate('accessPermList')
			.populate({
				path: 'accessRoleList',
				populate: [{
					path: 'permissions',
					select: ['title', 'description']
				}, {
					path: 'parentRole'
				}]
			})
			.lean()
		return routes
	}
	// Get all settings without routes
	async getSettings(userId) {
		verifyIdLength(userId)
		const userById = await UserModel.findById(userId)
		const superAdminRole = await RoleModel.findOne({title: 'SUPER-ADMIN'}).lean()
		if (!userById || !userById.roles.includes(superAdminRole._id)) throw ApiError.BadRequest(`Такого пользователя не существует или отказано в доступе`)
		const settingsDb = await SettingsModel.find().lean()
		const settings = {
			info: settingsDb[0].info,
			settings: settingsDb[0].settings
		}
		return settings
	}
}

export const settingsService = new SettingsService()