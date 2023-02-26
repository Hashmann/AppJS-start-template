import express from 'express'
import mongoose from 'mongoose'
import { apiRoutes } from '../router/routes.js'
import { MONGO_TEST_DB, testRoles } from './dataTest.js'
import RoleModel from '../models/Role.js'
import request from 'supertest'

const roleData = testRoles.user

const app = express()
app.use(express.json())
app.use('/api', apiRoutes)

let connection
beforeEach( async () => {
	mongoose.set('strictQuery', true)
	connection = await mongoose.connect(MONGO_TEST_DB)
})

describe('Role:', (object, method) => {
	it('Create a new test role', (done) => {
		// 	// 1 - 200 status code; 2 - check email was sent
		// 	// expect.assertions(2)
		//
		// 	let spy = jest.spyOn(mailService, 'sendActivationMail').mockImplementation( () => {
		// 		return true
		// 	})
		request(app)
			.post('/api/role/create')
			.send({title: roleData.title, permissions: ['can-all']})
			.set('Accept', 'application/json')
			// .expect(function(res) {
			// 	res.body.id = 'some fixed id'
			// 	res.body.name = res.body.name.toLowerCase()
			// })
			.expect(200, done)
		// expect(response.status).toBe(200)
	})

	it('Checking the test role in the database', async () => {
		// const user = await UserModel.findOne({email: userData.email})
		// expect(user.email).toBe(userData.email)
	})

	it('Deleting a test role from the database', async () => {
		// const user = await UserModel.findOneAndDelete({title: roleData.user.title})
		// expect(user.email).toBe(userData.email)
		// const checkUser = await UserModel.findOne({email: userData.email})
		// expect(checkUser).toBeFalsy()
	})
})

afterAll( () => {
	// Closing the DB connection allows Jest to exit successfully.
	mongoose.connection.close()
})