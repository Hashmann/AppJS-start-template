import Router from 'express'
import { testController } from '../controllers/test.controller.js'
import { userController } from '../controllers/user.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'
import roleMiddleware from '../middlewares/role.middleware.js'
import permissionsMiddleware from '../middlewares/permissions.middleware.js'

const router = new Router()

router.get('/', testController.testGetRequest)
/**
 * @swagger
 * /api/test:
 *  get:
 *    summary: Test Request.
 *    tags: [Test]
 *    description: Test Request.
 *    responses:
 *      200:
 *        description: Test response.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *
 *
 */

router.post('/', testController.testPostRequest)
/**
 * @swagger
 * /api/test:
 *  post:
 *    summary: New User registration.
 *    tags: [Test]
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

// Tests
router.get('/role', roleMiddleware(['SUPER-ADMIN', 'USER']), userController.getAllUsers)
router.get('/role-perm', authMiddleware, roleMiddleware(['USER']), permissionsMiddleware(['can-all']), userController.getAllUsers) // authMiddleware,
router.get('/perm', authMiddleware, permissionsMiddleware(['can-all', 'can-all-post']), userController.getAllUsers) // permissionsMiddleware(['can-all', 'post-create']),
router.get('/auth', authMiddleware, userController.getAllUsers)
// END Tests

export const testRouter = router