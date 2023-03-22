import { ApiError } from '../exceptions/api.error.js'
import { Logger } from '../utils/logger.utils.js'
import { app } from '../config/socket.config.js'
import { tokenService } from '../service/token.service.js'
import * as dotenv from 'dotenv'
import {
	verifyIdLength,
	uuidValidateV4, findSlug
} from '../utils/utils.js'
import url from "url";

dotenv.config({ path: `.env${process.env.NODE_ENV}` })

export default async function (req, res, next){
	try {
		const path = req.originalUrl.replace(/\?.*$/, '')
		console.log('path', path)
		const method = req.method
		const pathArr = path.split('/')
		let params = ''
		let newPath = ''
		const slugs = app.get('slugs')
		for (let pathSegment in pathArr) {
			// console.log('segment', pathArr[pathSegment])
			// console.log(findSlug(pathArr[pathSegment]))
			if (uuidValidateV4(pathArr[pathSegment])) {
				pathArr[pathSegment] = params = ':link'
			} else if (verifyIdLength(pathArr[pathSegment])) {
				pathArr[pathSegment] = params = ':id'
			} else if (findSlug(pathArr[pathSegment])) {
				pathArr[pathSegment] = params = ':slug'
			}
		}
		if (!params) params = null
		newPath = pathArr.join('/')
		console.log('newPath:', newPath)
		// Find route in local setting
		let route = {}
		const appRoutes = app.get('routes')
		// console.log(appRoutes)
		for (let appRoute in appRoutes) {
			if (appRoutes[appRoute].routeUrl === newPath && appRoutes[appRoute].method === method && appRoutes[appRoute].params === params) {
				route = appRoutes[appRoute]
			}
		}
		if (!route) return next(ApiError.BadRequest('Route not found'))
		console.log('method', method)
		console.log('route', route)
		console.log('route.params:', route.params)
		console.log('params:', params)
		if (route.params !== params) return next(ApiError.BadRequest('The params are different'))
		if (route.method !== method) return next(ApiError.BadRequest('The methods are different'))
		// Check auth
		if (route.isCheckAuth === true) {
			const accessToken = await tokenService.getHeaderAccessToken(req)
			const userData = await tokenService.validateAccessToken(accessToken, res)
			if (!userData) {
				Logger.error('User is invalid', 'settings.middleware', `${req.ip}`, '', 'ACCESS DENIED')
				return next(ApiError.UnauthorizedError())
			}
			req.user = userData
			Logger.info('User is auth', 'settings.middleware', `${req.ip}`, 'ACCESS', 'v')
		}
		// Check roles
		if (route.accessRoleList.length !== 0) {
			Logger.info('User roles is valid', 'settings.middleware', `${req.ip}`, 'ACCESS', 'v')
		}
		// Check permissions
		if (route.accessPermList.length !== 0) {
			Logger.info('User permissions is valid', 'settings.middleware', `${req.ip}`, 'ACCESS', 'v')
		}
		// Check ban
		if (route.isCheckBan === true) {
			Logger.info('The user is not banned', 'settings.middleware', `${req.ip}`, 'ACCESS', 'v')
		}
		console.log('path:', path, 'method:', method, 'newPath:', newPath, 'params:', params)
		Logger.info('ACCESS IS ALLOWED', 'settings.middleware', `${req.ip}`, 'ACCESS', 'v')
		next()
	} catch (err) {
		Logger.error('TEST middleware error', 'settings.middleware', `${req.ip}`, err, 'ACCESS DENIED')
		return next(ApiError.BadRequest('TEST middleware error', err))
	}
}