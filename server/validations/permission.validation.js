import { body } from 'express-validator'

export const permissionValidation = [
    body('title', 'Укажите навание. Мин 4 символа, макс 20').isString().isLength({min: 4, max: 20}),
    body('description', 'Укажите описание. Мин 4 символаб макс 50').optional().isString().isLength({min: 4, max: 50}).isEmpty(),
]