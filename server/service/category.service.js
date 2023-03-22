import CategoryModel from '../models/Category.js'
import { ApiError } from '../exceptions/api.error.js'
import { Logger } from '../utils/logger.utils.js'
import {
	saveSlugsToLocalSettings,
	slugGenerator,
	trimStringObjData,
	verifyIdLength
} from '../utils/utils.js'

class CategoryService {
	async create(categoryData) {
		const category = await CategoryModel.findOne({title: categoryData.title})
		if (category) throw ApiError.BadRequest(`Такая категория: ${categoryData.title} уже существует`)
		categoryData = trimStringObjData(categoryData)
		const slug = slugGenerator(categoryData.title.trim())
		categoryData = {...categoryData, slug}
		return await CategoryModel.create(categoryData)
	}

	async update(categoryId, categoryData) {
		verifyIdLength(categoryId)
		const categoryById = await CategoryModel.findById(categoryId)
		if (!categoryById) throw ApiError.BadRequest(`Такой категории не существует`)
		categoryData = trimStringObjData(categoryData)
		const slug = slugGenerator(categoryData.title.trim())
		categoryData = {...categoryData, slug}
		const categoryUpdate = await CategoryModel.findOneAndUpdate(categoryId,categoryData, {returnDocument: 'after'})
			.populate('parentCategory')
		await saveSlugsToLocalSettings(categoryId, slug)
		return categoryUpdate
	}

	async remove(categoryId) {
		verifyIdLength(categoryId)
		const categoryById = await CategoryModel.findById(categoryId)
		if (!categoryById) throw ApiError.BadRequest(`Такой категории не существует`)
		const categoryDelete = await CategoryModel.findByIdAndDelete(categoryId).populate('parentCategory')
		return categoryDelete
	}

	async getCategory (categoryId) {
		verifyIdLength(categoryId)
		// const categoryById = await CategoryModel.findByIdAndUpdate(
		// 	categoryId,
		// 	{
		// 		$inc: {viewsCount: 1},
		// 	}, {
		// 		returnDocument: 'after',
		// 	}
		// )
		const categoryById = await CategoryModel.findById(categoryId).populate('parentCategory')
		if (!categoryById) throw ApiError.BadRequest(`Такой категории не существует`)
		return categoryById
	}

	async getAllCategories () {
		const categories = await CategoryModel.find().populate('parentCategory')
		return categories
	}
}

export const categoryService = new CategoryService()