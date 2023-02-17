import { body } from 'express-validator'

export const roleValidation = [
    body('role', 'Минимум 4 символа').isLength({min: 4}),
]