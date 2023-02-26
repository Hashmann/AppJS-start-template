import UserModel from '../../models/User.js'
import { Logger } from '../../utils/logger.utils.js'
import { UserDto } from '../../dtos/user.dto.js'
import { tokenService } from '../../service/token.service.js'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import * as dotenv from 'dotenv'

dotenv.config({ path: `.env${process.env.NODE_ENV}` })

// Remove collection
export async function clearUsersTable() {
	try {
		await UserModel.collection.drop()
		Logger.info('User table cleared','MIGRATION','User','DONE','v')
	} catch (err) {
		Logger.error('User table cleared','MIGRATION','User',err,'DOWN')
	}
}

// Get tokens
async function getTokens(userDto) {
	try {
		const tokens = tokenService.generateTokens({...userDto})
		await tokenService.saveToken(userDto.id, (await tokens).refreshToken)
		return tokens
	} catch (err) {
		Logger.error('Get tokens','MIGRATION','User',err,'DOWN')
	}
}

// Get hashed password
async function getHashedPassword(password) {
	try {
		return await bcrypt.hash(password,3)
	} catch (err) {
		Logger.error('Get hashed password','MIGRATION','User',err,'DOWN')
	}
}

// Get date-time
function getDateTime() {
	try {
		const dateTime = new Date().toISOString().slice(0,19).split('T')
		const date = dateTime[0].split('-')
		return `${date[2]}.${date[1]}.${date[0]} - ${dateTime[1]}`
	} catch (err) {
		Logger.error('Get date-time','MIGRATION','User',err,'DOWN')
	}
}

// Administrative users
export async function administrativeUsersMigrate () {
	try {
		const administrativeUsers = {
			superAdmin: {
				email: process.env.MS_SUPER_ADMIN_EMAIL,
				password: process.env.MS_SUPER_ADMIN_PASSWORD,
				roles: ['SUPER-ADMIN', 'USER'],
				isActivated: true,
			},
			admin: {
				email: process.env.MS_ADMIN_EMAIL,
				password: process.env.MS_ADMIN_PASSWORD,
				roles: ['ADMIN', 'USER'],
				isActivated: true,
			},
		}
		// Add administrative users in database
		for (let user in administrativeUsers) {
			const hashedPassword = await getHashedPassword(administrativeUsers[user].password)
			const dateTime = getDateTime()
			const newUser = await UserModel.create({
				email: administrativeUsers[user].email,
				password: hashedPassword,
				roles: administrativeUsers[user].roles,
				isActivated: administrativeUsers[user].isActivated,
				activationLink: administrativeUsers[user].isActivated ? null : uuidv4(),
				activatedAt: administrativeUsers[user].isActivated ? dateTime : null
			})
			const userDto = new UserDto(newUser)
			await getTokens(userDto)
		}
		Logger.info('Administrative users created','MIGRATION','User','DONE','v')
	} catch (err) {
		Logger.error('Administrative users created','MIGRATION','User',err,'DOWN')
	}
}

// Test users
export async function testUsersMigrate () {
	try {
		const testUsers = {
			guest: {
				email: 'guest@email.com',
				password: '123456',
				roles: ['GUEST'],
				isActivated: false,
			},
			manager: {
				email: 'manager@email.com',
				password: '123456',
				roles: ['MANAGER', 'USER'],
				isActivated: true,
			},
			user: {
				email: 'user@email.com',
				password: '123456',
				roles: ['USER'],
				isActivated: true,
			},
		}
		// Add test users in database
		for (let user in testUsers) {
			const hashedPassword = await getHashedPassword(testUsers[user].password)
			const dateTime = getDateTime()
			const newUser = await UserModel.create({
				email: testUsers[user].email,
				password: hashedPassword,
				roles: testUsers[user].roles,
				isActivated: testUsers[user].isActivated,
				activationLink: testUsers[user].isActivated ? null : uuidv4(),
				activatedAt: testUsers[user].isActivated ? dateTime : null
			})
			const userDto = new UserDto(newUser)
			await getTokens(userDto)
		}
		Logger.info('Test users created','MIGRATION','User','DONE','v')
	} catch (err) {
		Logger.error('Test users created','MIGRATION','User',err,'DOWN')
	}
}

