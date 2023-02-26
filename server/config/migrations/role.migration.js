import { Logger } from '../../utils/logger.utils.js'
import RoleModel from '../../models/Role.js'

// Remove collection
export async function clearRolesTable() {
	try {
		await RoleModel.collection.drop()
		Logger.info('Role table cleared','MIGRATION','Role','DONE','v')
	} catch (err) {
		Logger.error('Role table cleared','MIGRATION','Role',err,'DOWN')
	}
}

// Roles
export async function rolesMigrate () {
	try {
		const roles = {
			superAdmin: {
				title: 'SUPER-ADMIN',
				permissions: ['can-all', 'admin-panel', 'profile-panel'],
				description: 'Super admin role'
			},
			admin: {
				title: 'ADMIN',
				permissions: ['can-all-post', 'can-all-role', 'can-all-perm', 'can-all-user', 'admin-panel'],
				description: 'Admin role'
			},
			manager: {
				title: 'MANAGER',
				permissions: ['can-all-post', 'user-read', 'users-read', 'admin-panel'],
				description: 'Manager role'
			},
			guest: {
				title: 'GUEST',
				permissions: ['post-read', 'posts-read'],
				description: 'Guest role'
			},
			user: {
				title: 'USER',
				permissions: ['post-read', 'posts-read', 'user-read', 'users-read', 'profile-panel'],
				description: 'User role'
			}
		}
		// Add roles in database
		for (let role in roles) {
			await RoleModel.create({
				title: roles[role].title,
				description: roles[role].description,
				permissions: roles[role].permissions
			})
		}
		Logger.info('Roles created','MIGRATION','Role','DONE','v')
	} catch (err) {
		Logger.error('Roles created','MIGRATION','Role',err,'DOWN')
	}
}