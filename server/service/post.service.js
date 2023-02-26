import PostModel from '../models/Post.js'
import { ApiError } from '../exceptions/api.error.js'
import { Logger } from '../utils/logger.utils.js'

class PostService {
	async create(title) {
		const post = await PostModel.findOne({title})
		if (post) {
			throw ApiError.BadRequest(`Такая роль: ${title} уже существует`)
		}
		return await PostModel.create({title})
	}

	async update(postId, updatePost) {
		//TODO вынести в отдельную функцию ???нужна ли эта проверка???
		if (postId.length < 24 || postId.length > 24) {
			throw ApiError.BadRequest(`Недопустимый идентификатор`)
		}
		//TODO END
		const roleById = await PostModel.findById(postId)
		if (!roleById) {
			throw ApiError.BadRequest(`Такой роли не существует`)
		}
		await PostModel.updateOne({
			_id: postId,
		},{
			title: updatePost.title,
			description: updatePost.description,
		})
	}

	async remove(postId) {
		if (postId.length < 24 || postId.length > 24) {
			throw ApiError.BadRequest(`Недопустимый идентификатор`)
		}
		const roleById = await PostModel.findById(postId)
		if (!roleById) {
			throw ApiError.BadRequest(`Такой роли не существует`)
		}
		await PostModel.findOneAndDelete(postId)
	}

	async getPost (postId) {
		if (postId.length < 24 || postId.length > 24) {
			throw ApiError.BadRequest(`Недопустимый идентификатор`)
		}
		const roleById = await PostModel.findById(postId)
		if (!roleById) {
			throw ApiError.BadRequest(`Такой роли не существует`)
		}
		return roleById
	}

	async getAllPosts () {
		const posts = await PostModel.find()
		return posts
	}
}

export const postService = new PostService()