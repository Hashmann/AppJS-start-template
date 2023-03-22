import { Logger } from '../../utils/logger.utils.js'
import { permissionsIds } from './permissions.seeder.js'
import RoleModel from '../../models/Role.js'
import CategoryModel from "../../models/Category.js";

// Remove collection
export async function clearRolesTable() {
	try {
		await RoleModel.collection.drop()
		Logger.info('Role table cleared','SEEDER','Role','DONE','v')
	} catch (err) {
		Logger.error('Role table clear','SEEDER','Role',err,'ERROR')
	}
}

// Ids all roles
export const rolesIds = {}

// Roles
export async function rolesSeeder () {
	try {
		const roles = {
			superAdmin: {
				title: 'SUPER-ADMIN',
				permissions: ['can-all', 'super-admin-panel', 'admin-panel', 'manager-panel', 'profile-panel', 'guest-panel', 'user-panel'],
				description: 'Super admin role',
				parentRole: null
			},
			admin: {
				title: 'ADMIN',
				permissions: [
					'can-all-post',
					'can-all-role',
					'can-all-perm',
					'can-all-user',
					'can-all-tag',
					'can-all-category',
					'can-all-ban',
					'can-all-like',
					'can-all-dislike',
					'can-all-wishlist',
					'can-all-comment',
					'can-all-message',
					'admin-panel',
					'manager-panel',
					'profile-panel',
					'guest-panel',
					'user-panel'
				],
				description: 'Admin role',
				parentRole: null
			},
			manager: {
				title: 'MANAGER',
				permissions: [
					'can-all-post',
					'can-all-tag',
					'can-all-category',
					'can-all-like',
					'can-all-dislike',
					'can-all-wishlist',
					'can-all-comment',
					'message-read',
					'message-get',
					'message-send',
					'manager-panel',
					'profile-panel',
					'guest-panel',
					'user-panel'
				],
				description: 'Manager role',
				parentRole: null
			},
			junManager: {
				title: 'MANAGER-JUN',
				permissions: [
					'can-all-post',
					'can-all-like',
					'can-all-dislike',
					'can-all-wishlist',
					'can-all-comment',
					'message-read',
					'message-get',
					'message-send',
					'manager-panel',
					'profile-panel',
					'guest-panel',
					'user-panel'
				],
				description: 'Junior manager role',
				parentRole: 'MANAGER'
			},
			guest: {
				title: 'GUEST',
				permissions: ['message-read', 'message-get', 'guest-panel', 'profile-panel'],
				description: 'Guest role',
				parentRole: null
			},
			user: {
				title: 'USER',
				permissions: [
					'can-all-like',
					'can-all-dislike',
					'can-all-wishlist',
					'comment-create',
					'comment-update',
					'message-read',
					'message-get',
					'message-send',
					'user-panel',
					'profile-panel'
				],
				description: 'User role',
				parentRole: null
			}
		}
		// Add roles in database
		for (let role in roles) {
			const rolePermissions = []
			for (let permission in permissionsIds) {
				if (roles[role].permissions.includes(permission)) {
					rolePermissions.push(permissionsIds[permission])
				}
			}
			const userRoles = await RoleModel.create({
				title: roles[role].title,
				description: roles[role].description,
				permissions: rolePermissions // roles[role].permissions
			})
			rolesIds[userRoles.title] = userRoles.id
		}
		// Add parent Role
		for (let role in roles) {
			if (roles[role].parentRole) {
				const parentRole = await RoleModel.findOne({title: roles[role].parentRole.trim()})
				const childRole = await RoleModel.findOneAndUpdate({
					title: roles[role].title.trim()
				}, {
					parentRole: parentRole._id
				})
			}
		}
		Logger.info('Roles created','SEEDER','Role','DONE','v')
	} catch (err) {
		Logger.error('Roles create','SEEDER','Role',err,'ERROR')
	}
}