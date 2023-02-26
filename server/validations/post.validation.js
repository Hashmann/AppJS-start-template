import { body } from 'express-validator'

export const postValidation = [
	body('title', 'Укажите название. Мин 4 символа, макс 20').isString().isLength({min: 4, max: 20}),
	body('content', 'Мин 3 символа, макс 50').optional().isString().isLength({min: 3, max: 50}),
	body('tags', 'Укажите массив').isArray().optional().isEmpty(),
	body('viewsCount', 'Просмотры').isNumeric(),
	body('user', 'Пользователь').isObject(),
	body('imageUrl', 'Ссылка на картинку').isURL().optional().isEmpty(),
]