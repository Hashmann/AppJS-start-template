import mongoose from 'mongoose'
import UserModel from '../models/User.js'
import { userService } from '../service/user.service.js'
import { userController } from '../controllers/user.controller.js'
import {MONGO_TEST_DB, testUsers} from './dataTest.js'
import {mailService} from '../service/mail.service.js'

import {apiRoutes} from '../router/routes.js'

import request from 'supertest'

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorMiddleware from "../middlewares/error.middleware.js";
import swaggerUi from "swagger-ui-express";
import {swaggerSpec} from "../utils/swagger.utils.js";

const userData = testUsers.realEmail
const email = userData.email

const app = express()
app.use(express.json())
// app.use(cookieParser())
// app.use(cors())
//
// app.use(errorMiddleware)
// // Routes
app.use('/api', apiRoutes)


let connection
beforeEach( async () => {
	mongoose.set('strictQuery', true)
	connection = await mongoose.connect(MONGO_TEST_DB)
})

describe('Test Request:', (object, method) => {
	it ('Test GET Request', async () => {
		const getTestReq = await request(app)
			.get('/api/user/test')
			.expect('Content-Type', /json/)
			.expect('Content-Length', '35')
			.expect(200, {message: 'Get test request - OK'})
	})

	it('Test POST Request', function(done) {
		request(app)
			.post('/api/user/test')
			.send({email: userData.email, password: userData.password})
			.set('Accept', 'application/json')
			// .expect(function(res) {
			// 	res.body.id = 'some fixed id'
			// 	res.body.name = res.body.name.toLowerCase()
			// })
			.expect(200, {
				email: userData.email,
				password: userData.password
			}, done)
	})
})

describe('User:', (object, method) => {
	it('Registration a new user', (done) => {
		// 	// 1 - 200 status code; 2 - check email was sent
		// 	// expect.assertions(2)
		//
		// 	let spy = jest.spyOn(mailService, 'sendActivationMail').mockImplementation( () => {
		// 		return true
		// 	})
		request(app)
			.post('/api/user/register')
			.send({email: userData.email, password: userData.password})
			.set('Accept', 'application/json')
			// .expect(function(res) {
			// 	res.body.id = 'some fixed id'
			// 	res.body.name = res.body.name.toLowerCase()
			// })
			.expect(200, done)
		// expect(response.status).toBe(200)
	})

	it('Checking the user in the database', async () => {
		const user = await UserModel.findOne({email})
		expect(user.email).toBe(userData.email)
	})

	// it('Test user login', async () => {
	// 	const regUser = await userController.register(userData)
	// 	const regUser = await userService.register(userData.email, userData.password)
	// 	expect(regUser._id).toBeDefined()
	// 	expect(regUser.email).toBe(userData.email)
	// })

	it('Deleting a user from the database', async () => {
		const user = await UserModel.findOneAndDelete({email})
		expect(user.email).toBe(userData.email)
		const checkUser = await UserModel.findOne({email})
		expect(checkUser).toBeFalsy()
	})
})

afterAll( () => {
	// Closing the DB connection allows Jest to exit successfully.
	mongoose.connection.close()
})