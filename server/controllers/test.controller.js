import UserModel from '../models/User.js'
import { ApiError } from '../exceptions/api.error.js'
import { Logger } from '../utils/logger.utils.js'

class TestController {
	async testGetRequest(req, res, next) {
		try {
			Logger.info('Test GET request', 'test.controller', '', 'DONE', 'v')
			res.json({message: 'Get test request - OK'})
		} catch (err) {
			Logger.error('Test GET request error','test.controller', '',err,'DOWN')
			next(err)
		}
	}
	async testPostRequest(req, res, next) {
		try {
			const {email, password} = req.body
			// const user = await UserModel.create({email, password})
			Logger.info('Test POST request', 'test.controller', '', 'DONE', 'v')
			res.json({email: email, password: password})
		} catch (err) {
			Logger.error('Test POST request error','test.controller', '',err,'DOWN')
			next(err)
		}
	}
}

export const testController = new TestController()