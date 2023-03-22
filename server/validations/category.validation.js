import { body } from 'express-validator'

export const categoryValidation = [
	body('title', 'Укажите название. Мин 4 символа, макс 20').isString().isLength({min: 0, max: 20}),
	body('description', 'Мин 3 символа, макс 50').optional().isString().isLength({min: 3, max: 50}),
]