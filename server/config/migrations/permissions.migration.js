import { Logger } from '../../utils/logger.utils.js'
import PermissionModel from '../../models/Permission.js'

// Remove collection
export async function clearPermissionsTable() {
	try {
		await PermissionModel.collection.drop()
		Logger.info('Permissions table cleared','MIGRATION','Permissions','DONE','v')
	} catch (err) {
		Logger.error('Permissions table cleared','MIGRATION','Permissions',err,'DOWN')
	}
}

// Super admin permissions
export async function sAdminPermissions() {
	try {
		await PermissionModel.create({
			title: 'can-all',
			description: 'Super Admin permissions'
		})
		await PermissionModel.create({
			title: 'admin-panel',
			description: 'Access to admin-panel'
		})
		await PermissionModel.create({
			title: 'profile-panel',
			description: 'Access to the user profile-panel'
		})
		Logger.info('Super admin permissions created','MIGRATION','Permissions','DONE','v')
	} catch (err) {
		Logger.error('Super admin permissions created','MIGRATION','Permissions',err,'DOWN')
	}

}

// Post Permissions
export async function postPermissionsMigrate () {
	try {
		const postPermissions = {
			postRead: {
				title: 'post-read',
				description: 'Can read post'
			},
			postsRead: {
				title: 'posts-read',
				description: 'Can read all posts'
			},
			postCreate: {
				title: 'post-create',
				description: 'Can create post'
			},
			postUpdate: {
				title: 'post-update',
				description: 'Can update post'
			},
			postDelete: {
				title: 'post-delete',
				description: 'Can delete post'
			},
			canAllPost: {
				title: 'can-all-post',
				description: 'Has permission to perform all operations with post'
			}
		}
		// Add permission in database
		for (let permission in postPermissions) {
			await PermissionModel.create({
				title: postPermissions[permission].title,
				description: postPermissions[permission].description
			})
		}
		Logger.info('Post permissions created','MIGRATION','Permissions','DONE','v')
	} catch (err) {
		Logger.error('Post permissions created','MIGRATION','Permissions',err,'DOWN')
	}

}

// Role Permissions
export async function rolePermissionsMigrate () {
	try {
		const rolePermissions = {
			roleRead: {
				title: 'role-read',
				description: 'Can read role'
			},
			rolesRead: {
				title: 'roles-read',
				description: 'Can read all roles'
			},
			roleCreate: {
				title: 'role-create',
				description: 'Can create role'
			},
			roleUpdate: {
				title: 'role-update',
				description: 'Can update role'
			},
			roleDelete: {
				title: 'role-delete',
				description: 'Can delete role'
			},
			canAllRole: {
				title: 'can-all-role',
				description: 'Has permission to perform all operations with role'
			}
		}
		// Add permission in database
		for (let permission in rolePermissions) {
			await PermissionModel.create({
				title: rolePermissions[permission].title,
				description: rolePermissions[permission].description
			})
		}
		Logger.info('Role permissions created','MIGRATION','Permissions','DONE','v')
	} catch (err) {
		Logger.error('Role permissions created','MIGRATION','Permissions',err,'DOWN')
	}
}

// User Permissions
export async function userPermissionsMigrate () {
	try {
		const userPermissions = {
			userRead: {
				title: 'user-read',
				description: 'Can read user'
			},
			usersRead: {
				title: 'users-read',
				description: 'Can read all users'
			},
			userCreate: {
				title: 'user-create',
				description: 'Can create user'
			},
			userUpdate: {
				title: 'user-update',
				description: 'Can update user'
			},
			userDelete: {
				title: 'user-delete',
				description: 'Can delete user'
			},
			canAllUser: {
				title: 'can-all-user',
				description: 'Has permission to perform all operations with user'
			}
		}
		// Add permission in database
		for (let permission in userPermissions) {
			await PermissionModel.create({
				title: userPermissions[permission].title,
				description: userPermissions[permission].description
			})
		}
		Logger.info('User permissions created','MIGRATION','Permissions','DONE','v')
	} catch (err) {
		Logger.error('User permissions created','MIGRATION','Permissions',err,'DOWN')
	}
}

// Perm Permissions
export async function permPermissionsMigrate () {
	try {
		const permPermissions = {
			permRead: {
				title: 'perm-read',
				description: 'Can read permission'
			},
			permsRead: {
				title: 'perms-read',
				description: 'Can read all permissions'
			},
			permCreate: {
				title: 'perm-create',
				description: 'Can create permission'
			},
			permUpdate: {
				title: 'perm-update',
				description: 'Can update permission'
			},
			permDelete: {
				title: 'perm-delete',
				description: 'Can delete permission'
			},
			canAllPerm: {
				title: 'can-all-perm',
				description: 'Has permission to perform all operations with permission'
			}
		}
		// Add permission in database
		for (let permission in permPermissions) {
			await PermissionModel.create({
				title: permPermissions[permission].title,
				description: permPermissions[permission].description
			})
		}
		Logger.info('Perm permissions created','MIGRATION','Permissions','DONE','v')
	} catch (err) {
		Logger.error('Perm permissions created','MIGRATION','Permissions',err,'DOWN')
	}
}