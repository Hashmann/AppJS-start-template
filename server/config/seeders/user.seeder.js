import UserModel from '../../models/User.js'
import BanModel from '../../models/Ban.js'
import StatsModel from '../../models/Stats.js'
import PersonalDataModel from '../../models/PersonalData.js'
import { Logger } from '../../utils/logger.utils.js'
import { UserDto } from '../../dtos/user.dto.js'
import { tokenService } from '../../service/token.service.js'
import { rolesIds } from './role.seeder.js'
import { faker } from '@faker-js/faker/locale/ru'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import * as dotenv from 'dotenv'
import {
	calculationBan,
	createPersonalData,
	createUserStats,
} from '../../utils/utils.js'

dotenv.config({ path: `.env${process.env.NODE_ENV}` })

// Remove User collection
export async function clearUsersTable() {
	try {
		await UserModel.collection.drop()
		Logger.info('User table cleared','SEEDER','User','DONE','v')
	} catch (err) {
		Logger.error('User table cleared','SEEDER','User',err,'DOWN')
	}
}

// Remove Ban collection
export async function clearBanTable() {
	try {
		await BanModel.collection.drop()
		Logger.info('Ban table cleared','SEEDER','User','DONE','v')
	} catch (err) {
		Logger.error('Ban table cleared','SEEDER','User',err,'DOWN')
	}
}

// Remove Stats collection
export async function clearStatsTable() {
	try {
		await StatsModel.collection.drop()
		Logger.info('Stats table cleared','SEEDER','User','DONE','v')
	} catch (err) {
		Logger.error('Stats table cleared','SEEDER','User',err,'DOWN')
	}
}

// Remove PersonalData collection
export async function clearPersonalDataTable() {
	try {
		await PersonalDataModel.collection.drop()
		Logger.info('PersonalData table cleared','SEEDER','User','DONE','v')
	} catch (err) {
		Logger.error('PersonalData table cleared','SEEDER','User',err,'DOWN')
	}
}

// Get tokens
async function getTokens(userDto) {
	try {
		const tokens = tokenService.generateTokens({...userDto})
		await tokenService.saveToken(userDto.id, (await tokens).refreshToken)
		return tokens
	} catch (err) {
		Logger.error('Get tokens','SEEDER','User',err,'DOWN')
	}
}

// Get hashed password
async function getHashedPassword(password) {
	try {
		return await bcrypt.hash(password,3)
	} catch (err) {
		Logger.error('Get hashed password','SEEDER','User',err,'DOWN')
	}
}

// Get date-time
function getDateTime() {
	try {
		const dateTime = new Date().toISOString().slice(0,19).split('T')
		const date = dateTime[0].split('-')
		return `${date[2]}.${date[1]}.${date[0]}-${dateTime[1]}`
	} catch (err) {
		Logger.error('Get date-time','SEEDER','User',err,'DOWN')
	}
}

// All users
export const seederUser = {}

// Administrative users
export async function administrativeUsersSeeder () {
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
			// Add Roles ids
			const userRole = []
			for (let role in rolesIds) {
				if (administrativeUsers[user].roles.includes(role)) {
					userRole.push(rolesIds[role])
				}
			}
			const hashedPassword = await getHashedPassword(administrativeUsers[user].password)
			const dateTime = getDateTime()
			const newUser = await UserModel.create({
				email: administrativeUsers[user].email,
				password: hashedPassword,
				roles: userRole, // administrativeUsers[user].roles,
				isActivated: administrativeUsers[user].isActivated,
				activationLink: administrativeUsers[user].isActivated ? null : uuidv4(),
				activatedAt: administrativeUsers[user].isActivated ? dateTime : null,
				resetPassLink: uuidv4(),
			})
			const userDto = new UserDto(newUser)
			// Personal data
			const personalData = await createPersonalData(newUser)
			personalData.phone = faker.phone.number('+7-9##-###-##-##')
			personalData.nickName = faker.internet.userName()
			personalData.surName = faker.name.lastName()
			personalData.firstName = faker.name.firstName()
			personalData.patronymic = faker.name.middleName()
			personalData.birthDate = faker.date.birthdate({ min: 25, max: 65, mode: 'age' })
			personalData.gender = faker.name.sex()
			personalData.avatarURL = faker.image.avatar()
			await personalData.save()
			// Create empty user stats
			const userStats = await createUserStats(newUser)
			await getTokens(userDto)
			seederUser[newUser.email] = newUser
		}
		Logger.info('Administrative users created','SEEDER','User','DONE','v')
	} catch (err) {
		Logger.error('Administrative users created','SEEDER','User',err,'DOWN')
	}
}

// Test users
export async function testUsersSeeder () {
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
			// Add Roles ids
			const userRole = []
			for (let role in rolesIds) {
				if (testUsers[user].roles.includes(role)) {
					userRole.push(rolesIds[role])
				}
			}
			const hashedPassword = await getHashedPassword(testUsers[user].password)
			const dateTime = getDateTime()
			const newUser = await UserModel.create({
				email: testUsers[user].email,
				password: hashedPassword,
				roles: userRole, // testUsers[user].roles,
				isActivated: testUsers[user].isActivated,
				activationLink: testUsers[user].isActivated ? null : uuidv4(),
				activatedAt: testUsers[user].isActivated ? dateTime : null,
				resetPassLink: uuidv4(),
			})
			const userDto = new UserDto(newUser)
			// Personal data
			const personalData = await createPersonalData(newUser)
			personalData.phone = faker.phone.number('+7-9##-###-##-##')
			personalData.nickName = faker.internet.userName()
			personalData.surName = faker.name.lastName()
			personalData.firstName = faker.name.firstName()
			personalData.patronymic = faker.name.middleName()
			personalData.birthDate = faker.date.birthdate({ min: 25, max: 65, mode: 'age' })
			personalData.gender = faker.name.sex()
			personalData.avatarURL = faker.image.avatar()
			await personalData.save()
			// Create empty user stats
			const userStats = await createUserStats(newUser)
			await getTokens(userDto)
			seederUser[newUser.email] = newUser
		}
		Logger.info('Test users created','SEEDER','User','DONE','v')
	} catch (err) {
		Logger.error('Test users created','SEEDER','User',err,'DOWN')
	}
}

// Ban users
export async function banUsersSeeder () {
	try {
		const banUsers = {
			userBan: {
				email: 'user-ban@email.com',
				password: '123456',
				roles: ['USER'],
				isActivated: true,
				ban: {
					banIssuedUserID: 'admin@email.com',
					banType: 'BAN',
					banPermissions: [],
					banDuration: '30m',
					description: 'BAN test',
				}
			},
			managerBan: {
				email: 'manager-ban@email.com',
				password: '123456',
				roles: ['MANAGER', 'USER'],
				isActivated: true,
				ban: {
					banIssuedUserID: 'admin@email.com',
					banType: 'BAN',
					banPermissions: [],
					banDuration: '1h',
					description: 'BAN test',
				}
			},
			guestBan: {
				email: 'guest-ban@email.com',
				password: '123456',
				roles: ['GUEST'],
				isActivated: true,
				ban: {
					banIssuedUserID: 'admin@email.com',
					banType: 'BAN',
					banPermissions: [],
					banDuration: '1m',
					description: 'BAN test',
				}
			},
			adminBan: {
				email: 'admin-ban@email.com',
				password: '123456',
				roles: ['ADMIN', 'USER'],
				isActivated: true,
				ban: {
					banIssuedUserID: 'admin@email.com',
					banType: 'BAN',
					banPermissions: [],
					banDuration: '1d',
					description: 'BAN test',
				}
			},
		}
		// Add ban users in database
		for (let user in banUsers) {
			// Add Roles ids
			const userRole = []
			for (let role in rolesIds) {
				if (banUsers[user].roles.includes(role)) {
					userRole.push(rolesIds[role])
				}
			}
			const hashedPassword = await getHashedPassword(banUsers[user].password)
			const dateTime = getDateTime()
			const newUser = await UserModel.create({
				email: banUsers[user].email,
				password: hashedPassword,
				roles: userRole, // testUsers[user].roles,
				isActivated: banUsers[user].isActivated,
				activationLink: banUsers[user].isActivated ? null : uuidv4(),
				activatedAt: banUsers[user].isActivated ? dateTime : null,
				resetPassLink: uuidv4(),
			})
			const userDto = new UserDto(newUser)
			// Personal data
			const personalData = await createPersonalData(newUser)
			personalData.phone = faker.phone.number('+7-9##-###-##-##')
			personalData.nickName = faker.internet.userName()
			personalData.surName = faker.name.lastName()
			personalData.firstName = faker.name.firstName()
			personalData.patronymic = faker.name.middleName()
			personalData.birthDate = faker.date.birthdate({ min: 25, max: 65, mode: 'age' })
			personalData.gender = faker.name.sex()
			personalData.avatarURL = faker.image.avatar()
			await personalData.save()
			// Create empty user stats
			const userStats = await createUserStats(newUser)
			await getTokens(userDto)
			// Issue ban
			const banIssueUser = await UserModel.findOne({email: banUsers[user].ban.banIssuedUserID})
			const timeBan = calculationBan(banUsers[user].ban)
			const ban = await BanModel.create({
				bannedUserID: newUser._id,
				banIssuedUserID: banIssueUser._id,
				banType: banUsers[user].ban.banType,
				banPermissions: banUsers[user].ban.banPermissions,
				description: banUsers[user].ban.description,
				banStart: timeBan.banStart,
				banDuration: timeBan.banDuration,
				banExpire: timeBan.banExpire,
			})
			const banList = []
			banList.push(ban._id)
			await UserModel.findByIdAndUpdate(newUser._id, {
				banList: banList
			})
			seederUser[newUser.email] = newUser
		}
		Logger.info('Ban users created','SEEDER','User','DONE','v')
	} catch (err) {
		Logger.error('Ban users created','SEEDER','User',err,'DOWN')
	}
}

