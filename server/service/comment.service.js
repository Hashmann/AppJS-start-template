import CommentModel from '../models/Comment.js'
import UserModel from '../models/User.js'
import { ApiError } from '../exceptions/api.error.js'
import { trimStringObjData, verifyIdLength } from '../utils/utils.js'

class CommentService {
	async update(commentId, commentData) {
		verifyIdLength(commentId)
		const commentById = await CommentModel.findById(commentId).lean()
		if (!commentById) throw ApiError.BadRequest(`Такого комментария не существует`)
		commentData = trimStringObjData(commentData)
		const comment = await CommentModel.findByIdAndUpdate(commentId, commentData, {returnDocument: 'after'})
			.populate({
				path: 'userID',
				select: ['email'],
			})
			.populate({
				path: 'postID',
				select: ['title', 'slug', 'tags', 'category', 'author', 'imageUrl', 'viewsCount', 'likeList', 'dislikeList', 'wishList'],
				populate: [{
					path: 'tags',
					select: ['title']
				}, {
					path: 'category',
					select: ['title', 'parentCategory'],
					populate: {
						path: 'parentCategory',
						select: ['title', 'parentCategory']
					}
				}, {
					path: 'author',
					select: ['email']
				}, {
					path: 'likeList',
					select: ['email']
				}, {
					path: 'dislikeList',
					select: ['email']
				}, {
					path: 'wishList',
					select: ['email']
				}]
			})
			.lean()
		return comment
	}

	async remove(commentId) {
		verifyIdLength(commentId)
		const commentById = await CommentModel.findById(commentId).lean()
		if (!commentById) throw ApiError.BadRequest(`Такого комментария не существует`)
		const deleteComment = await CommentModel.findByIdAndDelete(commentId)
		return deleteComment
	}

	async getAllComments() {
		const comments = await CommentModel.find()
			.populate({
				path: 'userID',
				select: ['email'],
			})
			.populate({
				path: 'postID',
				select: ['title', 'slug', 'tags', 'category', 'author', 'imageUrl', 'viewsCount', 'likeList', 'dislikeList', 'wishList'],
				populate: [{
					path: 'tags',
					select: ['title']
				}, {
					path: 'category',
					select: ['title', 'parentCategory'],
					populate: {
						path: 'parentCategory',
						select: ['title', 'parentCategory']
					}
				}, {
					path: 'author',
					select: ['email']
				}, {
					path: 'likeList',
					select: ['email']
				}, {
					path: 'dislikeList',
					select: ['email']
				}, {
					path: 'wishList',
					select: ['email']
				}]
			})
			.lean()
		return comments
	}

	async getComment(commentId) {
		const commentById = await CommentModel.findById(commentId).lean()
		if (!commentById) throw ApiError.BadRequest(`Такого комментария не существует`)
		const comment = await CommentModel.findById(commentId)
			.populate({
				path: 'userID',
				select: ['email'],
			})
			.populate({
				path: 'postID',
				select: ['title', 'slug', 'tags', 'category', 'author', 'imageUrl', 'viewsCount', 'likeList', 'dislikeList', 'wishList'],
				populate: [{
					path: 'tags',
					select: ['title']
				}, {
					path: 'category',
					select: ['title', 'parentCategory'],
					populate: {
						path: 'parentCategory',
						select: ['title', 'parentCategory']
					}
				}, {
					path: 'author',
					select: ['email']
				}, {
					path: 'likeList',
					select: ['email']
				}, {
					path: 'dislikeList',
					select: ['email']
				}, {
					path: 'wishList',
					select: ['email']
				}]
			})
			.lean()
		return comment
	}

	async likeComment(likeCommentId, likesUserId) {
		verifyIdLength(likeCommentId)
		verifyIdLength(likesUserId)
		const commentById = await CommentModel.findById(likeCommentId).lean()
		if (!commentById) throw ApiError.BadRequest(`Такого комментария не существует`)
		const userById = await UserModel.findById(likesUserId).lean()
		if (!userById) throw ApiError.BadRequest(`Такого пользователя не существует`)
		if (commentById.likeList.includes(likesUserId)) throw ApiError.BadRequest(`Вам уже нравится этот комментарий`)
		const likeComment = await CommentModel.findByIdAndUpdate(likeCommentId, {
			$push: {likeList: likesUserId},
			$pull: {dislikeList: likesUserId},
		})
	}

	async unlikeComment(unlikeCommentId, unlikesUserId) {
		verifyIdLength(unlikeCommentId)
		verifyIdLength(unlikesUserId)
		const commentById = await CommentModel.findById(unlikeCommentId).lean()
		if (!commentById) throw ApiError.BadRequest(`Такого комментария не существует`)
		const userById = await UserModel.findById(unlikesUserId).lean()
		if (!userById) throw ApiError.BadRequest(`Такого пользователя не существует`)
		const unlikeComment = await CommentModel.findByIdAndUpdate(unlikeCommentId, {
			$pull: {likeList: unlikesUserId},
		})
	}

	async dislikeComment(dislikeCommentId, dislikesUserId) {
		verifyIdLength(dislikeCommentId)
		verifyIdLength(dislikesUserId)
		const commentById = await CommentModel.findById(dislikeCommentId).lean()
		if (!commentById) throw ApiError.BadRequest(`Такого комментария не существует`)
		const userById = await UserModel.findById(dislikesUserId).lean()
		if (!userById) throw ApiError.BadRequest(`Такого пользователя не существует`)
		if (commentById.dislikeList.includes(dislikesUserId)) throw ApiError.BadRequest(`Вам уже не нравится этот комментарий`)
		const dislikeComment = await CommentModel.findByIdAndUpdate(dislikeCommentId, {
			$push: {dislikeList: dislikesUserId},
			$pull: {likeList: dislikesUserId},
		})
	}
	async undislikeComment(undislikeCommentId, undislikesUserId) {
		verifyIdLength(undislikeCommentId)
		verifyIdLength(undislikesUserId)
		const commentById = await CommentModel.findById(undislikeCommentId).lean()
		if (!commentById) throw ApiError.BadRequest(`Такого комментария не существует`)
		const userById = await UserModel.findById(undislikesUserId).lean()
		if (!userById) throw ApiError.BadRequest(`Такого пользователя не существует`)
		const undislikeComment = await CommentModel.findByIdAndUpdate(undislikeCommentId, {
			$pull: {dislikeList: undislikesUserId},
		})
	}
}

export const commentService = new CommentService()