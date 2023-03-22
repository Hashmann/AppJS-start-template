import { ApiError } from '../exceptions/api.error.js'
import { Logger } from '../utils/logger.utils.js'
import { postService } from '../service/post.service.js'
import { validationResult } from 'express-validator'

class PostController {
	async create(req, res, next) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) return next(ApiError.UnprocessableEntity('Validation error', errors.array()))
			const authorId = req.user.id
			const postData = {...req.body}
			const post = await postService.create(authorId, postData)
			Logger.info(`Post: ${post.title} was successfully created`,'post.controller',`${req.ip}`,'DONE','v')
			res.json({post, message: `Пост: ${post.title} был успешно создан`})
		} catch (err) {
			Logger.error('Create post error', 'post.controller', `${req.ip}`, err, 'ERROR')
			next(err)
		}
	}

	async update(req, res, next) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) return next(ApiError.BadRequest('Validation error', errors.array()))
			const userId = req.user.id
			const postId = req.params.id
			const postData = {...req.body}
			const post = await postService.update(userId, postId, postData)
			Logger.info(`Post id:${post.title} has been successfully updated`,'post.controller',`${req.ip}`,'DONE','v')
			res.json({post, message: `Пост id:${post.title} был успешно обновлен`})
		} catch (err) {
			Logger.error('Update post error', 'post.controller', `${req.ip}`, err, 'ERROR')
			next(err)
		}
	}

	async remove(req, res, next) {
		try {
			const postId = req.params.id
			const userId = req.user.id
			const post = await postService.remove(postId, userId)
			Logger.info(`Post id:${post.title} has been successfully deleted`,'post.controller',`${req.ip}`,'DONE','v')
			res.json({post, message: `Пост id:${post.title} был успешно удален`})
		} catch (err) {
			Logger.error('Remove post error', 'post.controller', `${req.ip}`, err, 'ERROR')
			next(err)
		}
	}

	async getPost(req, res, next) {
		try {
			const postSlug = req.params.postSlug
			const post = await postService.getPost(postSlug)
			Logger.info(`Post id:${post.title} was successfully received`,'post.controller',`${req.ip}`,'DONE','v')
			res.json({post, message: `Пост id:${post.title} был успешно получен`})
		} catch (err) {
			Logger.error('Get post error', 'post.controller', `${req.ip}`, err, 'ERROR')
			next(err)
		}
	}

	async getAllPosts(req, res, next) {
		try {
			const posts = await postService.getAllPosts()
			Logger.info(`All posts were successfully received`,'',`${req.ip}`,'DONE','v')
			res.json({posts, message: `Все посты были успешно получены`})
		} catch (err) {
			Logger.error('Get posts error', 'post.controller', `${req.ip}`, err, '')
			next(err)
		}
	}

	async getPostsWithTags(req, res, next) {
		try {
			const tagsQuery = req.query.tags
			const posts = await postService.getPostsWithTags(tagsQuery)
			Logger.info(`All posts were successfully received`,'post.controller',`${req.ip}`,'DONE','v')
			res.json({posts, message: `Все посты были успешно получены`})
		} catch (err) {
			Logger.error('Get post error', 'post.controller', `${req.ip}`, err, 'ERROR')
			next(err)
		}
	}

	async getPostsWithTag(req, res, next) {
		try {
			const tagSlug = req.params.tagSlug
			const posts = await postService.getPostsWithTag(tagSlug)
			Logger.info(`All posts were successfully received`,'post.controller',`${req.ip}`,'DONE','v')
			res.json({posts, message: `Все посты были успешно получены`})
		} catch (err) {
			Logger.error('Get post error', 'post.controller', `${req.ip}`, err, 'ERROR')
			next(err)
		}
	}

	async getPostFromCategory(req, res, next) {
		try {
			const categorySlug = req.params.categorySlug
			const posts = await postService.getPostFromCategory(categorySlug)
			Logger.info(`All posts were successfully received`,'post.controller',`${req.ip}`,'DONE','v')
			res.json({posts, message: `Все посты были успешно получены`})
		} catch (err) {
			Logger.error('Get post error', 'post.controller', `${req.ip}`, err, 'ERROR')
			next(err)
		}
	}

	async getPostByAuthor(req, res, next) {
		try {
			const authorId = req.params.id
			const posts = await postService.getPostByAuthor(authorId)
			Logger.info(`All posts were successfully received`,'post.controller',`${req.ip}`,'DONE','v')
			res.json({posts, message: `Все посты были успешно получены`})
		} catch (err) {
			Logger.error('Get post error', 'post.controller', `${req.ip}`, err, 'ERROR')
			next(err)
		}
	}

	async getPostFromCategoryWithTags(req, res, next) {
		try {
			const categorySlug = req.params.categorySlug
			const tagsQuery = req.query.tags
			const posts = await postService.getPostFromCategoryWithTags(categorySlug, tagsQuery)
			Logger.info(`All posts were successfully received`,'post.controller',`${req.ip}`,'DONE','v')
			res.json({posts, message: `Все посты были успешно получены`})
		} catch (err) {
			Logger.error('Get post error', 'post.controller', `${req.ip}`, err, 'ERROR')
			next(err)
		}
	}

	async likePost(req, res, next) {
		try {
			const likePostId = req.params.id
			const likesUserId = req.user.id
			const posts = await postService.likePost(likePostId, likesUserId)
			Logger.info(`User id:${likesUserId} liked the post id:${likePostId}`,'post.controller',`${req.ip}`,'DONE','v')
			res.json({posts, message: `Вам понравился пост id:${likePostId}`})
		} catch (err) {
			Logger.error('Like post error', 'post.controller', `${req.ip}`, err, 'ERROR')
			next(err)
		}
	}

	async unlikePost(req, res, next) {
		try {
			const likePostId = req.params.id
			const likesUserId = req.user.id
			const posts = await postService.unlikePost(likePostId, likesUserId)
			Logger.info(`User id:${likesUserId} removed like mark from the post id:${likePostId}`,'post.controller',`${req.ip}`,'DONE','v')
			res.json({posts, message: `Вы сняли отметку "нравится" у поста id:${likePostId}`})
		} catch (err) {
			Logger.error('Unlike post error', 'post.controller', `${req.ip}`, err, 'ERROR')
			next(err)
		}
	}

	async dislikePost(req, res, next) {
		try {
			const likePostId = req.params.id
			const likesUserId = req.user.id
			const posts = await postService.dislikePost(likePostId, likesUserId)
			Logger.info(`User id:${likesUserId} disliked the post id:${likePostId}`,'post.controller',`${req.ip}`,'DONE','v')
			res.json({posts, message: `Вам не нравится пост id:${likePostId}`})
		} catch (err) {
			Logger.error('Dislike post error', 'post.controller', `${req.ip}`, err, 'ERROR')
			next(err)
		}
	}

	async undislikePost(req, res, next) {
		try {
			const likePostId = req.params.id
			const likesUserId = req.user.id
			const posts = await postService.undislikePost(likePostId, likesUserId)
			Logger.info(`User id:${likesUserId} removed dislike mark from the post id:${likePostId}`,'post.controller',`${req.ip}`,'DONE','v')
			res.json({posts, message: `Вы сняли отметку "не нравится" у поста id:${likePostId}`})
		} catch (err) {
			Logger.error('Undislike post error', 'post.controller', `${req.ip}`, err, 'ERROR')
			next(err)
		}
	}

	async wishlistPost(req, res, next) {
		try {
			const likePostId = req.params.id
			const likesUserId = req.user.id
			const posts = await postService.wishlistPost(likePostId, likesUserId)
			Logger.info(`User id:${likesUserId} added the post id:${likePostId} to favorites`,'post.controller',`${req.ip}`,'DONE','v')
			res.json({posts, message: `Вы добавили пост id:${likePostId} в избранное`})
		} catch (err) {
			Logger.error('Wishlist post error', 'post.controller', `${req.ip}`, err, 'ERROR')
			next(err)
		}
	}

	async unwishlistPost(req, res, next) {
		try {
			const likePostId = req.params.id
			const likesUserId = req.user.id
			const posts = await postService.unwishlistPost(likePostId, likesUserId)
			Logger.info(`User id:${likesUserId} removed the post id:${likePostId} from favorites`,'post.controller',`${req.ip}`,'DONE','v')
			res.json({posts, message: `Вы удалили пост id:${likePostId} из избранного`})
		} catch (err) {
			Logger.error('Unwishlist post error', 'post.controller', `${req.ip}`, err, 'ERROR')
			next(err)
		}
	}

	async createComment(req, res, next) {
		try {
			const postId = req.params.id
			const commentUserId = req.user.id
			const commentData = {...req.body}
			const post = await postService.createComment(postId, commentUserId, commentData)
			Logger.info(`User id:${commentUserId} added comment to the post id:${post._id}`,'post.controller',`${req.ip}`,'DONE','v')
			res.json({post, message: `Комментарий к посту id:${post._id} добавлен`})
		} catch (err) {
			Logger.error('Create comment post error', 'post.controller', `${req.ip}`, err, 'ERROR')
			next(err)
		}
	}

	async getPostComments(req, res, next) {
		try {
			const postId = req.params.id
			const comments = await postService.getPostComments(postId)
			Logger.info(`User liked the post`,'post.controller',`${req.ip}`,'DONE','v')
			res.json({comments, message: `Все комментарии для поста получены`})
		} catch (err) {
			Logger.error('Get comments post error', 'post.controller', `${req.ip}`, err, 'ERROR')
			next(err)
		}
	}
}

export const postController = new PostController()