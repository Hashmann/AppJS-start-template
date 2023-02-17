import { body } from 'express-validator'

export const registerValidation = [
    body('email', 'Неверный формат email').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({min: 5}),
    // body('username', 'Укажите имя').isLength({min: 3}),
    // body('avatarUrl', 'Неверная ссылка на аватар').optional().isEmpty(),            // .isURL()
]

export const loginValidation = [
    body('email', 'Неверный формат email').isEmail(),
    // body('username', 'Укажите имя').isLength({min: 3}),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({min: 5}),
]