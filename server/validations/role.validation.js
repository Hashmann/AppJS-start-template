import { body } from 'express-validator'

export const roleValidation = [
    body('title', 'Укажите название. Мин 4 символа, макс 20').isString().isLength({min: 4, max: 20}),
    body('permissions', 'Укажите массив').isArray().isLength({min: 1}),
    body('description', 'Укажите описание. Мин 3 символа, макс 50').optional().isString().isLength({min: 3, max: 50}),
]