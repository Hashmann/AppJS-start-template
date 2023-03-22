import mongoose from 'mongoose'
import { dbConnect } from './db.config.js'
import { Logger } from '../utils/logger.utils.js'
import * as dotenv from 'dotenv'
import TokenModel from '../models/Token.js'
import CommentModel from '../models/Comment.js'
import {
	clearSettingsTable,
	clearSettingsRouteTable,
	routesSeeder,
	settingsSeeder
} from './seeders/settings.seeder.js'
import {
	clearPermissionsTable,
	postPermissionsSeeder,
	rolePermissionsSeeder,
	permPermissionsSeeder,
	userPermissionsSeeder,
	sAdminPermissionsSeeder,
	panelPermissionsSeeder,
	banPermissionsSeeder,
	tagPermissionsSeeder,
	categoryPermissionsSeeder,
	likePermissionsSeeder,
	dislikePermissionsSeeder,
	wishlistPermissionsSeeder,
	commentPermissionsSeeder,
	messagePermissionsSeeder,
} from './seeders/permissions.seeder.js'
import { clearRolesTable, rolesSeeder } from './seeders/role.seeder.js'
import {
	clearUsersTable,
	clearBanTable,
	clearStatsTable,
	clearPersonalDataTable,
	testUsersSeeder,
	banUsersSeeder,
	administrativeUsersSeeder
} from './seeders/user.seeder.js'
import { clearTagTable, tagsSeeder,} from './seeders/tag.seeder.js'
import { clearCategoryTable, categoriesSeeder } from './seeders/category.seeder.js'
import { clearPostTable, postsSeeder } from './seeders/post.seeder.js'

dotenv.config({ path: `.env${process.env.NODE_ENV}` })

// Remove Tokens collection
async function clearTokensTable() {
	try {
		await TokenModel.collection.drop()
		Logger.info('Tokens table cleared','SEEDER','db.seeders','DONE','v')
	} catch (err) {
		Logger.error('Tokens table cleared','SEEDER','db.seeders',err,'ERROR')
	}
}
// Remove Comments collection
async function clearCommentsTable() {
	try {
		await CommentModel.collection.drop()
		Logger.info('Comments table cleared','SEEDER','db.seeders','DONE','v')
	} catch (err) {
		Logger.error('Comments table cleared','SEEDER','db.seeders',err,'ERROR')
	}
}

// DB connect
await dbConnect()

// Clear DB
await clearSettingsRouteTable()
await clearSettingsTable()
await clearBanTable()
await clearTokensTable()
await clearRolesTable()
await clearPermissionsTable()
await clearPersonalDataTable()
await clearStatsTable()
await clearUsersTable()
await clearTagTable()
await clearCategoryTable()
await clearPostTable()
await clearCommentsTable()

// Permissions seeders
await sAdminPermissionsSeeder()
await panelPermissionsSeeder()
await permPermissionsSeeder()
await postPermissionsSeeder()
await rolePermissionsSeeder()
await userPermissionsSeeder()
await banPermissionsSeeder()
await tagPermissionsSeeder()
await categoryPermissionsSeeder()
await likePermissionsSeeder()
await dislikePermissionsSeeder()
await wishlistPermissionsSeeder()
await commentPermissionsSeeder()
await messagePermissionsSeeder()

// Roles seeders
await rolesSeeder()

// Users seeders
if(process.env.MS_ADMINISTRATIVE_USERS) await administrativeUsersSeeder()
if(process.env.MS_TEST_USERS) await testUsersSeeder()
await banUsersSeeder()

// Settings seeders
await routesSeeder()
await settingsSeeder()

// Tags seeder
await tagsSeeder()

// Category seeder
await categoriesSeeder()

// Post seeder
await postsSeeder()

Logger.info('All seeders are completed','SEED','','DONE','v')
// DB disconnect
await mongoose.disconnect()