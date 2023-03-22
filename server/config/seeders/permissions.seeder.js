import { Logger } from '../../utils/logger.utils.js'
import PermissionModel from '../../models/Permission.js'

// Remove collection
export async function clearPermissionsTable() {
	try {
		await PermissionModel.collection.drop()
		Logger.info('Permissions table cleared','SEEDER','Permissions','DONE','v')
	} catch (err) {
		Logger.error('Permissions table cleared','SEEDER','Permissions',err,'ERROR')
	}
}

// Ids all permissions
export const permissionsIds = {}

// Super admin permissions
export async function sAdminPermissionsSeeder() {
	try {
		const sAdminPermission = await PermissionModel.create({
			title: 'can-all',
			description: 'Super Admin permissions'
		})
		permissionsIds['can-all'] = sAdminPermission.id
		Logger.info('Super admin permissions created','SEEDER','Permissions','DONE','v')
	} catch (err) {
		Logger.error('Super admin permissions created','SEEDER','Permissions',err,'ERROR')
	}
}

// Panel permissions
export async function panelPermissionsSeeder() {
	try {
		const adminPanel = await PermissionModel.create({
			title: 'admin-panel',
			description: 'Access to admin-panel'
		})
		permissionsIds['admin-panel'] = adminPanel.id
		const profilePanel = await PermissionModel.create({
			title: 'profile-panel',
			description: 'Access to the user profile-panel'
		})
		permissionsIds['profile-panel'] = profilePanel.id
		const userPanel = await PermissionModel.create({
			title: 'user-panel',
			description: 'Access to the user user-panel'
		})
		permissionsIds['user-panel'] = userPanel.id
		const guestPanel = await PermissionModel.create({
			title: 'guest-panel',
			description: 'Access to the user guest-panel'
		})
		permissionsIds['guest-panel'] = guestPanel.id
		const superAdminPanel = await PermissionModel.create({
			title: 'super-admin-panel',
			description: 'Access to the user super-admin-panel'
		})
		permissionsIds['super-admin-panel'] = superAdminPanel.id
		Logger.info('Panel permissions created','SEEDER','Permissions','DONE','v')
	} catch (err) {
		Logger.error('Panel permissions created','SEEDER','Permissions',err,'ERROR')
	}
}

// Post Permissions
export async function postPermissionsSeeder () {
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
		// Add post permissions in database
		for (let permission in postPermissions) {
			const postPermission = await PermissionModel.create({
				title: postPermissions[permission].title,
				description: postPermissions[permission].description
			})
			permissionsIds[postPermission.title] = postPermission.id
		}
		Logger.info('Post permissions created','SEEDER','Permissions','DONE','v')
	} catch (err) {
		Logger.error('Post permissions created','SEEDER','Permissions',err,'ERROR')
	}
}

// Role Permissions
export async function rolePermissionsSeeder () {
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
		// Add role permissions in database
		for (let permission in rolePermissions) {
			const rolePermission = await PermissionModel.create({
				title: rolePermissions[permission].title,
				description: rolePermissions[permission].description
			})
			permissionsIds[rolePermission.title] = rolePermission.id
		}
		Logger.info('Role permissions created','SEEDER','Permissions','DONE','v')
	} catch (err) {
		Logger.error('Role permissions created','SEEDER','Permissions',err,'ERROR')
	}
}

// User Permissions
export async function userPermissionsSeeder () {
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
		// Add user permissions in database
		for (let permission in userPermissions) {
			const userPermission = await PermissionModel.create({
				title: userPermissions[permission].title,
				description: userPermissions[permission].description
			})
			permissionsIds[userPermission.title] = userPermission.id
		}
		Logger.info('User permissions created','SEEDER','Permissions','DONE','v')
	} catch (err) {
		Logger.error('User permissions created','SEEDER','Permissions',err,'ERROR')
	}
}

// Perm Permissions
export async function permPermissionsSeeder () {
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
		// Add permissions in database
		for (let permission in permPermissions) {
			const permPermission = await PermissionModel.create({
				title: permPermissions[permission].title,
				description: permPermissions[permission].description
			})
			permissionsIds[permPermission.title] = permPermission.id
		}
		Logger.info('Perm permissions created','SEEDER','Permissions','DONE','v')
	} catch (err) {
		Logger.error('Perm permissions created','SEEDER','Permissions',err,'ERROR')
	}
}

// Ban Permissions
export async function banPermissionsSeeder () {
	try {
		const banPermissions = {
			banRead: {
				title: 'ban-read',
				description: 'Can read ban'
			},
			banCreate: {
				title: 'ban-create',
				description: 'Can create ban'
			},
			banUpdate: {
				title: 'ban-update',
				description: 'Can update ban'
			},
			banDelete: {
				title: 'ban-delete',
				description: 'Can delete ban'
			},
			canAllBan: {
				title: 'can-all-ban',
				description: 'Has permission to perform all operations with ban'
			}
		}
		// Add ban permissions in database
		for (let permission in banPermissions) {
			const banPermission = await PermissionModel.create({
				title: banPermissions[permission].title,
				description: banPermissions[permission].description
			})
			permissionsIds[banPermission.title] = banPermission.id
		}
		Logger.info('Ban permissions created','SEEDER','Permissions','DONE','v')
	} catch (err) {
		Logger.error('Ban permissions created','SEEDER','Permissions',err,'ERROR')
	}
}

// Category Permissions
export async function categoryPermissionsSeeder () {
	try {
		const categoryPermissions = {
			categoryRead: {
				title: 'category-read',
				description: 'Can read category'
			},
			categoryCreate: {
				title: 'category-create',
				description: 'Can create category'
			},
			categoryUpdate: {
				title: 'category-update',
				description: 'Can update category'
			},
			categoryDelete: {
				title: 'category-delete',
				description: 'Can delete category'
			},
			canAllCategory: {
				title: 'can-all-category',
				description: 'Has permission to perform all operations with category'
			}
		}
		// Add category permissions in database
		for (let permission in categoryPermissions) {
			const categoryPermission = await PermissionModel.create({
				title: categoryPermissions[permission].title,
				description: categoryPermissions[permission].description
			})
			permissionsIds[categoryPermission.title] = categoryPermission.id
		}
		Logger.info('Category permissions created','SEEDER','Permissions','DONE','v')
	} catch (err) {
		Logger.error('Category permissions created','SEEDER','Permissions',err,'ERROR')
	}
}

// Tag Permissions
export async function tagPermissionsSeeder () {
	try {
		const tagPermissions = {
			tagRead: {
				title: 'tag-read',
				description: 'Can read tag'
			},
			tagCreate: {
				title: 'tag-create',
				description: 'Can create tag'
			},
			tagUpdate: {
				title: 'tag-update',
				description: 'Can update tag'
			},
			tagDelete: {
				title: 'tag-delete',
				description: 'Can delete tag'
			},
			canAllTag: {
				title: 'can-all-tag',
				description: 'Has permission to perform all operations with tag'
			}
		}
		// Add tag permissions in database
		for (let permission in tagPermissions) {
			const tagPermission = await PermissionModel.create({
				title: tagPermissions[permission].title,
				description: tagPermissions[permission].description
			})
			permissionsIds[tagPermission.title] = tagPermission.id
		}
		Logger.info('Tag permissions created','SEEDER','Permissions','DONE','v')
	} catch (err) {
		Logger.error('Tag permissions created','SEEDER','Permissions',err,'ERROR')
	}
}

// Like Permissions
export async function likePermissionsSeeder () {
	try {
		const likePermissions = {
			putPostLikes: {
				title: 'like-put-post',
				description: 'Can put post likes'
			},
			removePostLikes: {
				title: 'like-remove-post',
				description: 'Can remove post likes'
			},
			putUserLikes: {
				title: 'like-put-user',
				description: 'Can put user likes'
			},
			removeUserLikes: {
				title: 'like-remove-user',
				description: 'Can remove user likes'
			},
			putCommLikes: {
				title: 'like-put-comment',
				description: 'Can put comment likes'
			},
			removeCommLikes: {
				title: 'like-remove-comment',
				description: 'Can remove comment likes'
			},
			canAllLike: {
				title: 'can-all-like',
				description: 'Has permission to perform all operations with likes'
			}
		}
		// Add like permissions in database
		for (let permission in likePermissions) {
			const likePermission = await PermissionModel.create({
				title: likePermissions[permission].title,
				description: likePermissions[permission].description
			})
			permissionsIds[likePermission.title] = likePermission.id
		}
		Logger.info('Like permissions created','SEEDER','Permissions','DONE','v')
	} catch (err) {
		Logger.error('Like permissions created','SEEDER','Permissions',err,'ERROR')
	}
}

// DisLike Permissions
export async function dislikePermissionsSeeder () {
	try {
		const dislikePermissions = {
			putPostDislikes: {
				title: 'dislike-put-post',
				description: 'Can put post dislikes'
			},
			removePostDislikes: {
				title: 'dislike-remove-post',
				description: 'Can remove post dislikes'
			},
			putUserDislikes: {
				title: 'dislike-put-user',
				description: 'Can put user dislikes'
			},
			removeUserDislikes: {
				title: 'dislike-remove-user',
				description: 'Can remove user dislikes'
			},
			putCommDislikes: {
				title: 'dislike-put-comment',
				description: 'Can put comment dislikes'
			},
			removeCommDislikes: {
				title: 'dislike-remove-comment',
				description: 'Can remove comment dislikes'
			},
			canAllDislikes: {
				title: 'can-all-dislike',
				description: 'Has permission to perform all operations with dislikes'
			}
		}
		// Add dislike permissions in database
		for (let permission in dislikePermissions) {
			const dislikePermission = await PermissionModel.create({
				title: dislikePermissions[permission].title,
				description: dislikePermissions[permission].description
			})
			permissionsIds[dislikePermission.title] = dislikePermission.id
		}
		Logger.info('Dislike permissions created','SEEDER','Permissions','DONE','v')
	} catch (err) {
		Logger.error('Dislike permissions created','SEEDER','Permissions',err,'ERROR')
	}
}

// Wishlist Permissions
export async function wishlistPermissionsSeeder () {
	try {
		const wishlistPermissions = {
			readWishlist: {
				title: 'wishlist-read',
				description: 'Can read users wishlist'
			},
			putWishlist: {
				title: 'wishlist-put',
				description: 'Can put in wishlist'
			},
			removeWishlist: {
				title: 'wishlist-remove',
				description: 'Can remove it from wishlist'
			},
			canAllWishlist: {
				title: 'can-all-wishlist',
				description: 'Has permission to perform all operations with wishlist'
			}
		}
		// Add wishlist permissions in database
		for (let permission in wishlistPermissions) {
			const wishlistPermission = await PermissionModel.create({
				title: wishlistPermissions[permission].title,
				description: wishlistPermissions[permission].description
			})
			permissionsIds[wishlistPermission.title] = wishlistPermission.id
		}
		Logger.info('Wishlist permissions created','SEEDER','Permissions','DONE','v')
	} catch (err) {
		Logger.error('Wishlist permissions created','SEEDER','Permissions',err,'ERROR')
	}
}

// Comment Permissions
export async function commentPermissionsSeeder () {
	try {
		const commentPermissions = {
			readComments: {
				title: 'comment-read',
				description: 'Can read comments'
			},
			createComments: {
				title: 'comment-create',
				description: 'Can create comments'
			},
			updateComments: {
				title: 'comment-update',
				description: 'Can update comments'
			},
			deleteComments: {
				title: 'comment-delete',
				description: 'Can delete comments'
			},
			canAllComments: {
				title: 'can-all-comment',
				description: 'Has permission to perform all operations with comments'
			}
		}
		// Add comments permissions in database
		for (let permission in commentPermissions) {
			const commentPermission = await PermissionModel.create({
				title: commentPermissions[permission].title,
				description: commentPermissions[permission].description
			})
			permissionsIds[commentPermission.title] = commentPermission.id
		}
		Logger.info('Comment permissions created','SEEDER','Permissions','DONE','v')
	} catch (err) {
		Logger.error('Comment permissions created','SEEDER','Permissions',err,'ERROR')
	}
}

// Message Permissions
export async function messagePermissionsSeeder () {
	try {
		const messagePermissions = {
			readMessage: {
				title: 'message-read',
				description: 'Can read message'
			},
			getMessage: {
				title: 'message-get',
				description: 'Can get message'
			},
			sendMessage: {
				title: 'message-send',
				description: 'Can send message'
			},
			deleteMessage: {
				title: 'message-delete',
				description: 'Can delete message'
			},
			canAllMessage: {
				title: 'can-all-message',
				description: 'Has permission to perform all operations with messages'
			}
		}
		// Add message permissions in database
		for (let permission in messagePermissions) {
			const messagePermission = await PermissionModel.create({
				title: messagePermissions[permission].title,
				description: messagePermissions[permission].description
			})
			permissionsIds[messagePermission.title] = messagePermission.id
		}
		Logger.info('Message permissions created','SEEDER','Permissions','DONE','v')
	} catch (err) {
		Logger.error('Message permissions created','SEEDER','Permissions',err,'ERROR')
	}
}