import { ApiError } from '../exceptions/api.error.js'
import { Logger } from '../utils/logger.utils.js'
import { postService } from '../service/post.service.js'
import { validationResult } from 'express-validator'

class PostController {
	async create(req, res, next) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest('Validation error', errors.array()))
			}
			const {title} = req.body
			const post = await postService.create(title.toUpperCase())
			Logger.info(`post: ${title.toUpperCase()} was successfully created`,'',`${req.ip}`,'DONE','v')
			res.json({post, message: `Пост: ${title.toUpperCase()} был успешно создан`})
		} catch (err) {
			Logger.error('Post Error', 'post.controller', `${req.ip}`, err, '')
			next(err)
		}
	}

	async update(req, res, next) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest('Validation error', errors.array()))
			}
			const postId = req.params.id
			//TODO перенести в сервис?!
			const updatePost = {
				title: req.body.title.toUpperCase(),
				description: req.body.description
			}
			const post = await postService.update(postId, updatePost)
			Logger.info(`Post id:${postId} has been successfully updated`,'',`${req.ip}`,'DONE','v')
			res.json({message: `Пост id:${postId} был успешно обновлен`})
		} catch (err) {
			Logger.error('Post Error', 'post.controller', `${req.ip}`, err, '')
			next(err)
		}
	}

	async remove(req, res, next) {
		try {
			const postId = req.params.id
			const post = await postService.remove(postId)
			Logger.info(`Post id:${postId} has been successfully deleted`,'',`${req.ip}`,'DONE','v')
			res.json({message: `Пост id:${postId} был успешно удален`})
		} catch (err) {
			Logger.error('Post Error', 'post.controller', `${req.ip}`, err, '')
			next(err)
		}
	}

	async getPost(req, res, next) {
		try {
			const postId = req.params.id
			const post = await postService.getPost(postId)
			Logger.info(`Post id:${postId} was successfully received`,'',`${req.ip}`,'DONE','v')
			res.json({post, message: `Пост id:${postId} был успешно получен`})
		} catch (err) {
			Logger.error('Post Error', 'post.controller', `${req.ip}`, err, '')
			next(err)
		}
	}

	async getAllPosts(req, res, next) {
		try {
			const posts = await postService.getAllPosts()
			Logger.info(`All posts were successfully received`,'',`${req.ip}`,'DONE','v')
			res.json({posts, message: `Все посты были успешно получены`})
		} catch (err) {
			Logger.error('Post Error', 'post.controller', `${req.ip}`, err, '')
			next(err)
		}
	}
}

export const postController = new PostController()