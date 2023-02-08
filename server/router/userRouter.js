import Router from 'express'
import { userController } from '../controllers/user-controller.js'
// import {registerValidation, loginValidation} from '../validations/userValidation.js'
import handleValidationErrors from '../middlewares/handleValidationErrors.js'
// import checkAuth from "../middlewares/checkAuth.js";
const router = new Router()

// router.post('/register', registerValidation, handleValidationErrors, authController.register)

/**
 * @swagger
 * /api/user/register:
 *  post:
 *    summary: New User registration.
 *    tags: [User]
 *    description: New User registration.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                format: email
 *                example: user@email.com
 *                description: The user email.
 *              password:
 *                type: string
 *                format: password
 *                minLength: 3
 *                maxLength: 20
 *                example: user@email.com
 *                description: The user email.
 *
 *    responses:
 *      200:
 *        description: The User has been created.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user:
 *                  type: object
 *                  properties:
 *                    email:
 *                      type: string
 *                      format: email
 *                    id:
 *                      type: string
 *                      example: 63e3a52807200ac23d9bada1
 *                    isActivated:
 *                      type: boolean
 *                      default: false
 *                accessToken:
 *                  type: string
 *                  description: The User access token.
 *                refreshToken:
 *                  type: string
 *                  description: The User refresh token.
 *                message:
 *                  type: string
 *                  example: Пользователь был успешно зарегистрирован
 *      400:
 *        description: API-ERROR[BadRequest] The user already exists
 *      404:
 *        description: Not found
 *      500:
 *        description: Unexpected error
 * */
router.post('/register', userController.register)

// router.post('/login', loginValidation, handleValidationErrors, authController.login)
// router.post('/logout', authController.logout)
/**
 * @swagger
 * /api/user/activate/{link}:
 *   get:
 *     summary: Activated a new User.
 *     tags: [User]
 *     description: Activated a new User.
 *     responses:
 *       200:
 *         description: User activated and redirect to client url.
 *
 */
router.get('/activate/:link', userController.activate)
// router.get('/refresh', authController.refresh)


// router.get('/me', checkAuth, authController.getMe)

/**
 * @swagger
 * /api/user/test:
 *   get:
 *     summary: Test Request.
 *     tags: [User]
 *     description: Test Request.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *
 */
router.get('/test', userController.getUsers)

export const userRouter = router