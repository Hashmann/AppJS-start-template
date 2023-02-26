import Router from 'express'
import { userController } from '../controllers/user.controller.js'
import {
	registerValidation,
	loginValidation,
	updateValidation
} from '../validations/user.validation.js'
import authMiddleware from '../middlewares/auth.middleware.js'
import roleMiddleware from '../middlewares/role.middleware.js'
import permissionsMiddleware from '../middlewares/permissions.middleware.js'

const router = new Router()

router.post('/register', registerValidation, userController.register)
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

router.post('/login', loginValidation, userController.login)
/**
 * @swagger
 * /api/user/login:
 *  post:
 *    summary: Login user.
 *    tags: [User]
 *    description: Login user.
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

router.post('/logout', authMiddleware, userController.logout)
/**
 * @swagger
 * /api/user/logout:
 *  post:
 *    summary: Logout user.
 *    tags: [User]
 *    description: Logout user.
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

router.patch('/:id', authMiddleware, permissionsMiddleware(['can-all', 'can-all-user', 'user-update']), updateValidation, userController.update)
/**
 * @swagger
 * /api/user/{id}:
 *     patch:
 *       summary: Update a user by ID
 *       tags: [User]
 *       description: Update a user by ID.
 *       parameters:
 *         - name: {id}
 *           in: '#/components/schemas/User'
 *           required: true
 *           type: string
 *           format: GUID
 *           description: The GUID of a specific user
 *       requestBody:
 *         description: Update customer with properties to be changed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       responses:
 *         '200':
 *           description: Successful response
 *           schema:
 *             $ref: "#/components/schemas/User"
 *         "400":
 *           description: API-ERROR[BadRequest] User does not exist
 * definitions:
 *   PatchRequest:
 *     type: array
 *     items:
 *       $ref: "#/definitions/PatchDocument"
 *   PatchDocument:
 *     description: A JSONPatch document as defined by RFC 6902
 *     required:
 *      - "op"
 *      - "path"
 *     properties:
 *      op:
 *       type: string
 *       description: The operation to be performed
 *       enum:
 *        - "add"
 *        - "remove"
 *        - "replace"
 *        - "move"
 *        - "copy"
 *        - "test"
 *      path:
 *       type: string
 *       description: A JSON-Pointer
 *      value:
 *       type: object
 *       description: The value to be used within the operations.
 *      from:
 *       type: string
 *       description: A string containing a JSON Pointer value.
 *  */

router.get('/activate/:link', userController.activate)
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

router.get('/refresh', userController.refresh)
/**
 * @swagger
 * /api/user/refresh:
 *   get:
 *     summary: Refresh tokens.
 *     tags: [User]
 *     description: Refresh tokens.
 *     responses:
 *       200:
 *         description: Token refreshed.
 *
 */

router.get('/all',authMiddleware, permissionsMiddleware(['can-all', 'can-all-user', 'users-read']), userController.getAllUsers)
/**
 * @swagger
 * /api/user/all:
 *   get:
 *     summary: Get all users.
 *     tags: [User]
 *     description: Get all users.
 *     responses:
 *       200:
 *         description: Get all users.
 *
 */

// Tests
router.get('/role', roleMiddleware(['SUPER-ADMIN', 'USER']), userController.getAllUsers)
router.get('/role-perm', authMiddleware, roleMiddleware(['USER']), permissionsMiddleware(['can-all', 'post-read']), userController.getAllUsers) // authMiddleware,
router.get('/perm', authMiddleware, permissionsMiddleware(['can-all', 'post-create']), userController.getAllUsers) // authMiddleware,
// END Tests

router.get('/:id', authMiddleware, permissionsMiddleware(['can-all', 'can-all-user', 'user-read']), userController.getUser)
/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Get user by ID.
 *     tags: [User]
 *     description: Get user by ID.
 *     responses:
 *       200:
 *         description: Get user by ID.
 *
 */

router.delete('/remove/:id', authMiddleware, permissionsMiddleware(['can-all', 'can-all-user', 'user-delete']), userController.remove)
/**
 * @swagger
 * /api/user/remove/{id}:
 *  delete:
 *      summary: Delete user by ID.
 *      description: Delete user by ID
 *      tags: [User]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: string id of user to delete
 *      responses:
 *          200:
 *              description: User that was deleted
 */

export const userRouter = router