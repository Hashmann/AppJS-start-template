import { body } from 'express-validator'

export const registerValidation = [
    body('email', 'Неверный формат email').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({min: 5, max: 25}),
]

export const loginValidation = [
    body('email', 'Неверный формат email').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({min: 5, max: 25}),
]

export const updateValidation = [
    body('phone', 'Неверный формат номера').isNumeric().optional().isEmpty(),
    body('roles', 'Укажите массив').isArray().isLength({min: 1}),
    body('isActivated', '?').isBoolean().default(false),
    body('activationLink', 'Укажите ссылку активации').isURL().optional().isEmpty(),
    body('activatedAt', 'Укажите дату активации').isString().optional().isEmpty(),
    body('nickName', 'Укажите ник. Мин 3 символа, макс 20').optional().isString().isLength({min: 3, max: 20}).isEmpty(),
    body('surName', 'Укажите фамилию. Мин 3 символа, макс 20').optional().isString().isLength({min: 3, max: 20}).isEmpty(),
    body('firstName', 'Укажите имя. Мин 3 символа, макс 20').optional().isString().isLength({min: 3, max: 20}).isEmpty(),
    body('patronymic', 'Укажите отчество. Мин 3 символа, макс 20').optional().isString().isLength({min: 3, max: 20}).isEmpty(),
    body('birthDate', 'Укажите дату рождения').optional().isString().isEmpty(),
    body('gender', 'Укажите пол').optional().isString().isEmpty(),
    body('avatarURL', 'Укажите ссылку на аватар').optional().isURL().isEmpty(),
]