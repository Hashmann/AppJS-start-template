import { ApiError } from '../exceptions/api.error.js'
import { Logger } from '../utils/logger.utils.js'
import TagModel from '../models/Tag.js'
import {
	saveSlugsToLocalSettings,
	slugGenerator, trimStringObjData,
	verifyIdLength
} from '../utils/utils.js'

class TagService {
	async create(tagData) {
		const tag = await TagModel.findOne(tagData)
		if (tag) throw ApiError.BadRequest(`Такой тэг: ${tagData.title} уже существует`)
		tagData = trimStringObjData(tagData)
		const slug = slugGenerator(tagData.title.trim())
		tagData = {...tagData, slug}
		return await TagModel.create(tagData)
	}

	async update(tagId, tagData) {
		verifyIdLength(tagId)
		const tagById = await TagModel.findById(tagId)
		if (!tagById) throw ApiError.BadRequest(`Такой тэг не существует`)
		tagData = trimStringObjData(tagData)
		const slug = slugGenerator(tagData.title.trim())
		tagData = {...tagData, slug}
		const tagUpdate = await TagModel.findOneAndUpdate(tagId,tagData, {returnDocument: 'after'})
			.populate('parentTag')
		await saveSlugsToLocalSettings(tagId, slug)
		return tagUpdate
	}

	async remove(tagId) {
		verifyIdLength(tagId)
		const tagById = await TagModel.findById(tagId)
		if (!tagById) throw ApiError.BadRequest(`Такой тэг не существует`)
		const tagDelete = await TagModel.findByIdAndDelete(tagId)
		return tagDelete
	}

	async getTag (tagId) {
		verifyIdLength(tagId)
		const tagById = await TagModel.findById(tagId).populate('parentTag')
		if (!tagById) throw ApiError.BadRequest(`Такого тэга не существует`)
		return tagById
	}

	async getAllTags () {
		const tags = await TagModel.find().populate('parentTag')
		return tags
	}
}

export const tagService = new TagService()