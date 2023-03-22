import { Logger } from '../utils/logger.utils.js'
import { commentService } from '../service/comment.service.js'
import { validationResult } from 'express-validator'


class CommentController {
	async update(req, res, next) {
		try {
			// const errors = validationResult(req)
			// if (!errors.isEmpty()) return next(ApiError.BadRequest('Validation error', errors.array()))
			const commentId = req.params.id
			const commentData = {...req.body}
			const comment = await commentService.update(commentId, commentData)
			Logger.info(`Comment id:${comment._id} has been successfully updated`,'comment.controller',`${req.ip}`,'DONE','v')
			res.json({comment, message: `Комментарий id:${comment._id} был успешно обновлен`})
		} catch (err) {
			Logger.error('Comment Error', 'comment.controller', `${req.ip}`, err, 'ERROR')
			next(err)
		}
	}

	async remove(req, res, next) {
		try {
			const commentId = req.params.id
			const comment = await commentService.remove(commentId)
			Logger.info(`Comment id:${comment._id} has been successfully deleted`,'comment.controller',`${req.ip}`,'DONE','v')
			res.json({comment, message: `Комментарий id:${comment._id} был успешно удален`})
		} catch (err) {
			Logger.error('Comment Error', 'comment.controller', `${req.ip}`, err, 'ERROR')
			next(err)
		}
	}

	async getAllComments(req, res, next) {
		try {
			const comments = await commentService.getAllComments()
			Logger.info(`All comments has been successfully received`,'comment.controller',`${req.ip}`,'DONE','v')
			res.json({comments, message: `Все комментарии были успешно получены`})
		} catch (err) {
			Logger.error('Comment Error', 'comment.controller', `${req.ip}`, err, 'ERROR')
			next(err)
		}
	}

	async getComment(req, res, next) {
		try {
			const commentId = req.params.id
			const comment = await commentService.getComment(commentId)
			Logger.info(`Comment id:${comment._id} has been successfully received`,'comment.controller',`${req.ip}`,'DONE','v')
			res.json({comment, message: `Комментарий id:${comment._id} был успешно получен`})
		} catch (err) {
			Logger.error('Comment Error', 'comment.controller', `${req.ip}`, err, 'ERROR')
			next(err)
		}
	}

	async likeComment(req, res, next) {
		try {
			const likeCommentId = req.params.id
			const likesUserId = req.user.id
			await commentService.likeComment(likeCommentId, likesUserId)
			Logger.info(`User id:${likesUserId} liked the comment id:${likeCommentId}`,'comment.controller',`${req.ip}`,'DONE','v')
			res.json({message: `Вам понравился комментарий id:${likeCommentId}`})
		} catch (err) {
			Logger.error('Like Post Error', 'comment.controller', `${req.ip}`, err, 'ERROR')
			next(err)
		}
	}

	async unlikeComment(req, res, next) {
		try {
			const unlikeCommentId = req.params.id
			const unlikesUserId = req.user.id
			await commentService.unlikeComment(unlikeCommentId, unlikesUserId)
			Logger.info(`User id:${unlikesUserId} unliked the comment id:${unlikeCommentId}`,'comment.controller',`${req.ip}`,'DONE','v')
			res.json({message: `Вам больше не нравиться комментарий id:${unlikeCommentId}`})
		} catch (err) {
			Logger.error('Like Post Error', 'comment.controller', `${req.ip}`, err, 'ERROR')
			next(err)
		}
	}

	async dislikeComment(req, res, next) {
		try {
			const dislikeCommentId = req.params.id
			const dislikesUserId = req.user.id
			await commentService.dislikeComment(dislikeCommentId, dislikesUserId)
			Logger.info(`User id:${dislikesUserId} disliked the comment id:${dislikeCommentId}`,'comment.controller',`${req.ip}`,'DONE','v')
			res.json({message: `Вам не нравиться комментарий id:${dislikeCommentId}`})
		} catch (err) {
			Logger.error('Like Post Error', 'comment.controller', `${req.ip}`, err, 'ERROR')
			next(err)
		}
	}

	async undislikeComment(req, res, next) {
		try {
			const undislikeCommentId = req.params.id
			const undislikesUserId = req.user.id
			await commentService.undislikeComment(undislikeCommentId, undislikesUserId)
			Logger.info(`User id:${undislikesUserId} undisliked the comment id:${undislikeCommentId}`,'comment.controller',`${req.ip}`,'DONE','v')
			res.json({message: `Вы сняли отметку 'не нравиться' у комментария id:${undislikeCommentId}`})
		} catch (err) {
			Logger.error('Like Post Error', 'comment.controller', `${req.ip}`, err, 'ERROR')
			next(err)
		}
	}
}

export const commentController = new CommentController()