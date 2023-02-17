import mongoose from 'mongoose'
import UserModel from '../models/User.js'
import { MONGO_TEST_DB, testUsers } from './dataTest.js'

const userData = testUsers.test

describe('DB Check:', () => {
	let connection
	let validUser
	beforeAll(async () => {
		mongoose.set('strictQuery', true)
		connection = await mongoose.connect(MONGO_TEST_DB)
	})

	it('Test User create', async () => {
		validUser = await UserModel.create(userData)
		expect(validUser._id).toBeDefined()
		expect(validUser.email).toBe(userData.email)
	})

	it('Test User delete', async () => {
		let deleteUser = await UserModel.findOneAndDelete({_id: validUser._id})
		expect(UserModel.findOne({_id: validUser._id})).toBeTruthy()
	})

	afterAll( () => {
		// Closing the DB connection allows Jest to exit successfully.
		mongoose.connection.close()
	})
})