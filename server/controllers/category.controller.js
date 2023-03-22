import { ApiError } from '../exceptions/api.error.js'
import { Logger } from '../utils/logger.utils.js'
import { categoryService } from '../service/category.service.js'
import { validationResult } from 'express-validator'

class CategoryController {
	async create(req, res, next) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest('Validation error', errors.array()))
			}
			const categoryData = {...req.body}
			const category = await categoryService.create(categoryData)
			Logger.info(`Category: ${categoryData.title} was successfully created`,'category.controller',`${req.ip}`,'DONE','v')
			res.json({category, message: `Категория: ${categoryData.title} была успешно создана`})
		} catch (err) {
			Logger.error('Category Error', 'category.controller', `${req.ip}`, err, 'ERROR')
			next(err)
		}
	}

	async update(req, res, next) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest('Validation error', errors.array()))
			}
			const categoryId = req.params.id
			const categoryData = {...req.body}
			const categoryUpdate = await categoryService.update(categoryId, categoryData)
			Logger.info(`Category id:${categoryId} has been successfully updated`,'category.controller',`${req.ip}`,'DONE','v')
			res.json({categoryUpdate, message: `Категория id:${categoryId} была успешно обновлена`})
		} catch (err) {
			Logger.error('Category Error', 'category.controller', `${req.ip}`, err, 'ERROR')
			next(err)
		}
	}

	async remove(req, res, next) {
		try {
			const categoryId = req.params.id
			const categoryDelete = await categoryService.remove(categoryId)
			Logger.info(`Category id:${categoryId} has been successfully deleted`,'category.controller',`${req.ip}`,'DONE','v')
			res.json({categoryDelete, message: `Категория id:${categoryId} была успешно удалена`})
		} catch (err) {
			Logger.error('Category Error', 'category.controller', `${req.ip}`, err, 'ERROR')
			next(err)
		}
	}

	async getCategory(req, res, next) {
		try {
			const categoryId = req.params.id
			const category = await categoryService.getCategory(categoryId)
			Logger.info(`Category id:${categoryId} was successfully received`,'category.controller',`${req.ip}`,'DONE','v')
			res.json({category, message: `Категория id:${categoryId} была успешно получена`})
		} catch (err) {
			Logger.error('Category Error', 'category.controller', `${req.ip}`, err, 'ERROR')
			next(err)
		}
	}

	async getAllCategories(req, res, next) {
		try {
			const categories = await categoryService.getAllCategories()
			Logger.info(`All categories were successfully received`,'category.controller',`${req.ip}`,'DONE','v')
			res.json({categories, message: `Все категории были успешно получены`})
		} catch (err) {
			Logger.error('Categories Error', 'category.controller', `${req.ip}`, err, 'ERROR')
			next(err)
		}
	}
}

export const categoryController = new CategoryController()