import { ApiError } from '../exceptions/api.error.js'
import { Logger } from '../utils/logger.utils.js'
import { tagService } from '../service/tag.service.js'
import { validationResult } from 'express-validator'

class TagController {
	async create(req, res, next) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest('Validation error', errors.array()))
			}
			const tagData = {...req.body}
			const tag = await tagService.create(tagData)
			Logger.info(`Tag: ${tag.title} was successfully created`,'tag.controller',`${req.ip}`,'DONE','v')
			res.json({tag, message: `Тэг: ${tag.title} был успешно создан`})
		} catch (err) {
			Logger.error('Tag Error', 'tag.controller', `${req.ip}`, err, 'ERROR')
			next(err)
		}
	}

	async update(req, res, next) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest('Validation error', errors.array()))
			}
			const tagId = req.params.id
			const tagData = {...req.body}
			const tagUpdate = await tagService.update(tagId, tagData)
			Logger.info(`Tag id:${tagId} has been successfully updated`,'tag.controller',`${req.ip}`,'DONE','v')
			res.json({tagUpdate, message: `Тэг id:${tagId} был успешно обновлен`})
		} catch (err) {
			Logger.error('Tag Error', 'tag.controller', `${req.ip}`, err, 'ERROR')
			next(err)
		}
	}

	async remove(req, res, next) {
		try {
			const tagId = req.params.id
			const tagDelete = await tagService.remove(tagId)
			Logger.info(`Tag id:${tagId} has been successfully deleted`,'tag.controller',`${req.ip}`,'DONE','v')
			res.json({tagDelete, message: `Тэг id:${tagId} был успешно удален`})
		} catch (err) {
			Logger.error('Tag Error', 'tag.controller', `${req.ip}`, err, 'ERROR')
			next(err)
		}
	}

	async getTag(req, res, next) {
		try {
			const tagId = req.params.id
			const tag = await tagService.getTag(tagId)
			Logger.info(`Tag id:${tagId} was successfully received`,'tag.controller',`${req.ip}`,'DONE','v')
			res.json({tag, message: `Тэг id:${tagId} был успешно получен`})
		} catch (err) {
			Logger.error('Tag Error', 'tag.controller', `${req.ip}`, err, 'ERROR')
			next(err)
		}
	}

	async getAllTags(req, res, next) {
		try {
			const tags = await tagService.getAllTags()
			Logger.info(`All tags were successfully received`,'tag.controller',`${req.ip}`,'DONE','v')
			res.json({tags, message: `Все тэги были успешно получены`})
		} catch (err) {
			Logger.error('Tag Error', 'tag.controller', `${req.ip}`, err, 'ERROR')
			next(err)
		}
	}
}

export const tagController = new TagController()