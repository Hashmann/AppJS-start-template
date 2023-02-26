import * as dotenv from 'dotenv'

dotenv.config({ path: `.env${process.env.NODE_ENV}` })

export const MONGO_TEST_DB = `mongodb://127.0.0.1:27017/AppJS-server-test`
export const testUsers = {
	test: {
		email: 'test-user@email.com',
		password: '123456'
	},
	realEmail: {
		email: process.env.TEST_REAL_EMAIL,
		password: process.env.TEST_REAL_PASSWORD
	}
}

export const testRoles = {
	user: {
		title: 'user',
	},
	admin: {
		title: 'admin',
	}
}