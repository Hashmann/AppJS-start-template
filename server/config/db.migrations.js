import mongoose from 'mongoose'
import { dbConnect } from './db.config.js'
import { Logger } from '../utils/logger.utils.js'
import * as dotenv from 'dotenv'
import TokenModel from '../models/Token.js'
import {
	clearPermissionsTable,
	postPermissionsMigrate,
	rolePermissionsMigrate,
	userPermissionsMigrate,
	sAdminPermissions,
} from './migrations/permissions.migration.js'
import { clearRolesTable, rolesMigrate } from './migrations/role.migration.js'
import {
	clearUsersTable,
	testUsersMigrate,
	administrativeUsersMigrate
} from './migrations/user.migration.js'

dotenv.config({ path: `.env${process.env.NODE_ENV}` })

// Clear Tokens table
async function clearTokensTable() {
	try {
		await TokenModel.collection.drop()
		Logger.info('Tokens table cleared','MIGRATION','','DONE','v')
	} catch (err) {
		Logger.error('Tokens table cleared','MIGRATION','',err,'DOWN')
	}
}

// DB connect
await dbConnect()

// Clear DB
await clearPermissionsTable()
await clearRolesTable()
await clearUsersTable()
await clearTokensTable()

// Permissions migrate
await postPermissionsMigrate()
await rolePermissionsMigrate()
await userPermissionsMigrate()
await sAdminPermissions()

// Roles migrate
await rolesMigrate()

// Users migrate
if(process.env.MS_ADMINISTRATIVE_USERS) await administrativeUsersMigrate()
if(process.env.MS_TEST_USERS) await testUsersMigrate()

// Post seeder

Logger.info('All migrations are completed','MIGRATION','','DONE','v')
// DB disconnect
await mongoose.disconnect()