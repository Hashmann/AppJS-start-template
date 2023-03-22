import { app } from '../config/socket.config.js'
import { ApiError } from '../exceptions/api.error.js'
import { Logger}  from './logger.utils.js'
import { UserDto } from '../dtos/user.dto.js'
import { tokenService } from '../service/token.service.js'
import { PersonalDataDto } from '../dtos/personalData.dto.js'
import { UserStatsDto } from '../dtos/userStats.dto.js'
import UserModel from '../models/User.js'
import PermissionModel from '../models/Permission.js'
import RoleModel from '../models/Role.js'
import TokenModel from '../models/Token.js'
import PersonalDataModel from '../models/PersonalData.js'
import StatsModel from '../models/Stats.js'
import PostModel from '../models/Post.js'
import TagModel from '../models/Tag.js'
import CategoryModel from '../models/Category.js'
import mongoose from 'mongoose'
import SettingsRouteModel from '../models/settings/SettingsRoute.js'
import { validate as uuidValidate, version as uuidVersion } from 'uuid'
import {buildSanitizeFunction} from 'express-validator'
import BanModel from '../models/Ban.js'

// Saving routes to local settings from the database
export async function saveRoutesToLocalSettings() {
	const routes = await SettingsRouteModel.find().populate('accessPermList').populate('accessRoleList').exec()
	const routesList = {}
	for (let route in routes) {
		// List permissions title
		const routePerms = []
		for (let routePerm in routes[route].accessPermList) {
			routePerms.push(routes[route].accessPermList[routePerm].title)
		}
		// List roles title
		const routeRoles = []
		for (let routeRole in routes[route].accessRoleList) {
			routeRoles.push(routes[route].accessRoleList[routeRole].title)
		}
		routes[route].accessPermList = routePerms
		routes[route].accessRoleList = routeRoles
		routesList[routes[route]._id] = routes[route]
	}
	// Save to local settings
	app.set('routes', routesList)
	// console.log(app.get('routes'))
	Logger.info('Local settings [routes] updated', 'utils', '', 'DONE', 'v')
	// console.log('settings.routes', app.locals.settings.routes['640cf99e0d9405d1222f5f2e'])
}

// Saving slugs to local settings from the database
export async function saveSlugsToLocalSettings(id, slug) {
	if (!id && !slug) {
		const slugsList = {
			categories: {},
			tags: {},
			posts: {},
		}
		// Categories
		const categories = await CategoryModel.find()
		for (let category in categories) {
			slugsList.categories[categories[category]._id] = categories[category].slug
		}
		// Tags
		const tags = await TagModel.find()
		for (let tag in tags) {
			slugsList.tags[tags[tag]._id] = tags[tag].slug
		}
		// Posts
		const posts = await PostModel.find()
		for (let post in posts) {
			slugsList.posts[posts[post]._id] = posts[post].slug
		}
		// Save to local settings
		app.set('slugs', slugsList)
		Logger.info('Local settings [slugs] updated', 'utils', '', 'DONE', 'v')
		// console.log('settings.slugs', app.locals.settings.slugs)
	} else {
		// Update slug by id
		const slugsList = app.get('slugs')
		for (let slugType in slugsList) {
			for (let slugId in slugsList[slugType]) {
				if (slugId === id) {
					slugsList[slugType][slugId] = slug
				}
			}
		}
		// Save to local settings
		app.set('slugs', slugsList)
		Logger.info('Local settings [slugs] updated', 'utils', '', 'DONE', 'v')
		// console.log('settings.slugs', app.locals.settings.slugs)
	}
}

// Find slug
export function findSlug(slugData) {
	const slugs = app.get('slugs')
	for (let typeSlug in slugs) {
		for (let slug in slugs[typeSlug]) {
			if (slugs[typeSlug][slug] === slugData) {
				return true
			}
		}
	}
	return false
}

// Verify ID
export function verifyIdLength(id) {
	// if (id.length < 24 || id.length > 24) {
	// 	throw ApiError.BadRequest(`Недопустимый идентификатор`)
	// }
	return mongoose.Types.ObjectId.isValid(id)
}

// Verify uuid
export function uuidValidateV4(uuid) {
	return uuidValidate(uuid) && uuidVersion(uuid) === 4;
}

// User DTO
export async function getUserDTO(user) {
	try {
		const userDto = new UserDto(user)
		const tokens = tokenService.generateTokens({...userDto})
		await tokenService.saveToken(userDto.id, (await tokens).refreshToken)
		return {
			user: userDto,
			accessToken: (await tokens).accessToken,
			refreshToken: (await tokens).refreshToken,
		}
	} catch (err) {
		Logger.error('getUserDTO', 'utils', '', err, 'ERROR')
		next(ApiError.BadRequest('Ошибка получения дто', err))
	}
}

// Create personal data
export async function createPersonalData(user) {
	try {
		const personalDataDTO = new PersonalDataDto(user)
		const personalData = await PersonalDataModel.create({
			userID: personalDataDTO.id,
			phone: personalDataDTO.phone,
			nickName: personalDataDTO.nickName,
			surName: personalDataDTO.surName,
			firstName: personalDataDTO.firstName,
			patronymic: personalDataDTO.patronymic,
			birthDate: personalDataDTO.birthDate,
			gender: personalDataDTO.gender,
			avatarURL: personalDataDTO.avatarURL,
		})
		return personalData
	} catch (err) {
		Logger.error('getPersonalDataDTO', 'utils', '', err, 'ERROR')
		next(ApiError.BadRequest('Ошибка получения дто', err))
	}
}

// Create user stats
export async function createUserStats(user) {
	try {
		const userStatsDTO = new UserStatsDto(user)
		const userStats = await StatsModel.create({
			userID: userStatsDTO.id,
			likePostList: userStatsDTO.likePostList,
			dislikePostList: userStatsDTO.dislikePostList,
			likeUserList: userStatsDTO.likeUserList,
			dislikeUserList: userStatsDTO.dislikeUserList,
			wishList: userStatsDTO.wishList,
		})
		return userStats
	} catch (err) {
		Logger.error('createUserStats', 'utils', '', err, 'ERROR')
		next(ApiError.BadRequest('Ошибка получения дто', err))
	}
}

// Generate slug
export function slugGenerator(text) {
	try {
		if (!text) {
			return ApiError.BadRequest('Отсутствует заголовок для слага')
		}
		text = text.toLowerCase().trim().split(' ')
		const a = []
		text.forEach(word => {
			if (!(word.trim().length === 0)) a.push(word.trim())
		})
		text = a.join('-').split('')
		const letters = {
			'а': 'a',   'б': 'b',   'в': 'v',  'г': 'g',  'д': 'd',  'е': 'e',  'ё': 'yo', 'ж': 'zh', 'з': 'z',
			'и': 'i',   'й': 'y',   'к': 'k',  'л': 'l',  'м': 'm',  'н': 'n',  'о': 'o',  'п': 'p',
			'р': 'r',   'с': 's',   'т': 't',  'у': 'u',  'ф': 'f',  'х': 'h',  'ц': 'ts', 'ч': 'ch',
			'ш': 'sh',  'щ': 'sht', 'ъ': 'y',  'ы': 'y',  'ь': '',   'ю': 'yu', 'я': 'ya', '-': '-'               // 'ь': '\''
		}
		const slug = []
			for (let i = 0; i < text.length; i++) {
				// Character eng
				if (text[i].codePointAt(0) >= 97 && text[i].codePointAt(0) <= 122) {
					slug.push(text[i])
				}
				// Number
				if (text[i].codePointAt(0) >= 48 && text[i].codePointAt(0) <= 57) {
					slug.push(text[i])
				}
				// Ru
				for (let letter in letters) {
					if (text[i] === letter) {
						slug.push(letters[letter])
					}
				}
			}
		return slug.join('')
	} catch (err) {
		Logger.error('slugGenerator', 'utils', '', err, 'ERROR')
		next(ApiError.BadRequest('Ошибка получения слага', err))
	}
}

// Calculation ban expire
export function calculationBan(banData) {
	const now = Date.now()
	const banDuration = banDur(banData.banDuration)
	const expire = new Date(now + banDuration)
	return banData = {
		...banData,
		banStart: now,
		banExpire: expire
	}
}
function banDur(dur) {
	let duration = dur.split('')
	const time = duration.pop()
	duration = Number(duration.join(''))
	switch (time) {
		case 's':
			dur = duration * 1000
			break
		case 'm':
			dur = duration * 60 * 1000
			break
		case 'h':
			dur = duration * 60 * 60 * 1000
			break
		case 'd':
			dur = duration * 24 * 60 * 60 * 1000
			break
	}
	return dur
}

// Trim string data
export function trimStringObjData(data) {
	Object.entries(data).map(d => {
		let [key, value] = d
		// if (!value instanceof Array || !value instanceof Object || typeof(value) != 'number')
		// if (value !== null) data[key] = value.trim()
		if (!value instanceof Array || !value instanceof Object)
			if (typeof(value) != 'number')
				if (value !== null) data[key] = value.trim()
	})
	return data
}

// Check ban expired
export async function checkBansExpire(userId) {
	const userBans = await BanModel.find({bannedUserID: userId}).lean()
	for (let ban in userBans) {
		const now = Date.now()
		const banExpire = userBans[ban].banExpire.getTime()
		if (banExpire - now <= 0) {
			userBans[ban].isActive = false
			userBans[ban].save()
		}
	}
}
