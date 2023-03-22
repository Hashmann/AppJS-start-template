import { Logger } from '../utils/logger.utils.js'
import { settingsService } from '../service/settings.service.js'



class SettingsController {
	async updateRoute(req, res, next) {
		try {
			const routeId = req.params.id
			const userId = req.user.id
			const routeData = {...req.body}
			const route = await settingsService.updateRoute(routeId, userId, routeData)
			Logger.info(`Route ${route.routeUrl} has been successfully updated`,'settings.controller',`${req.ip}`,'DONE','v')
			res.json({route, message: `Роут ${route.routeUrl} был успешно обновлен`})
		} catch (err) {
			Logger.error('Route update error', 'settings.controller', `${req.ip}`, err, 'ERROR')
			next(err)
		}
	}

	async updateSettings(req, res, next) {
		try {
			const userId = req.user.id
			const settingsData = {...req.body}
			const settings = await settingsService.updateSettings(userId, settingsData)
			Logger.info(`Settings has been successfully updated`,'settings.controller',`${req.ip}`,'DONE','v')
			res.json({settings, message: `Настройки были успешно обновлены`})
		} catch (err) {
			Logger.error('Settings update error', 'settings.controller', `${req.ip}`, err, 'ERROR')
			next(err)
		}
	}

	async getRoute(req, res, next) {
		try {
			const routeId = req.params.id
			const userId = req.user.id
			const route = await settingsService.getRoute(routeId, userId)
			Logger.info(`Route ${route.routeUrl} has been successfully received`,'settings.controller',`${req.ip}`,'DONE','v')
			res.json({route, message: `Роут ${route.routeUrl} был успешно получен`})
		} catch (err) {
			Logger.error('Get route error', 'settings.controller', `${req.ip}`, err, 'ERROR')
			next(err)
		}
	}

	async getRoutes(req, res, next) {
		try {
			console.log('111')
			const userId = req.user.id
			const routes = await settingsService.getRoutes(userId)
			Logger.info(`Routes has been successfully received`,'settings.controller',`${req.ip}`,'DONE','v')
			res.json({routes, message: `Роуты были успешно получены`})
		} catch (err) {
			Logger.error('Get routes error', 'settings.controller', `${req.ip}`, err, 'ERROR')
			next(err)
		}
	}

	async getSettings(req, res, next) {
		try {
			const userId = req.user.id
			const settings = await settingsService.getSettings(userId)
			Logger.info(`Settings has been successfully received`,'settings.controller',`${req.ip}`,'DONE','v')
			res.json({settings, message: `Настройки были успешно получены`})
		} catch (err) {
			Logger.error('Get settings error', 'settings.controller', `${req.ip}`, err, 'ERROR')
			next(err)
		}
	}
}

export const settingsController = new SettingsController()