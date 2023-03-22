import { body } from 'express-validator'

export const tagValidation = [
	body('title', 'Укажите название. Мин 4 символа, макс 20').isString().isLength({min: 4, max: 20}),
	body('description', 'Мин 3 символа, макс 50').optional().isString().isLength({min: 3, max: 50}),
	// body('imageUrl', 'Укажите ссылку на картинку').optional().isString().isURL,  // .isLength({min: 3, max: 50})
]