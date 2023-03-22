import { ApiError } from '../exceptions/api.error.js'
import { Logger } from '../utils/logger.utils.js'
import { tokenService } from '../service/token.service.js'
import * as dotenv from 'dotenv'

dotenv.config({ path: `.env${process.env.NODE_ENV}` })

export default async function (req, res, next){
	try {
		// console.log('req.params', req.params)
		const accessToken = await tokenService.getHeaderAccessToken(req)
		const { refreshToken } = req.cookies
		const userData = await tokenService.validateAccessToken(accessToken, res)
		if (!userData) {
			Logger.error('User is invalid', 'auth.middleware', `${req.ip}`, '', 'ACCESS DENIED')
			return next(ApiError.UnauthorizedError())
		}
		req.user = userData
		Logger.info('Auth is valid', 'auth.middleware', `${req.ip}`, 'ACCESS', 'v')
		// const url = req.originalUrl
		// const route = await SettingsRouteModel.findOne({urlPath: url}).populate('accessPerm').exec()
		next()
	} catch (err) {
		Logger.error('Auth middleware error', 'auth.middleware', `${req.ip}`, err, 'ACCESS DENIED')
		return next(ApiError.UnauthorizedError())
	}
}