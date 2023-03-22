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
import settingsMiddleware from '../middlewares/settings.middleware.js'

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
 *              $ref: "#/definitions/userRegisterRes"
 *      400:
 *        description: API-ERROR[BadRequest] The user already exists
 *      404:
 *        description: Not found
 *      422:
 *        description: Validation Error
 *      500:
 *        description: Internal Server Error
 * definitions:
 *   userRegisterRes:
 *     type: object
 *     properties:
 *       user:
 *         type: object
 *         $ref: "#/components/schemas/UserDTO"
 *       accessToken:
 *         type: string
 *         description: Access token.
 *       refreshToken:
 *         type: string
 *         description: Refresh token.
 *       message:
 *         type: string
 *         example: Пользователь был успешно зарегистрирован
 *
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
 *              $ref: "#/definitions/userRegisterRes"
 *      400:
 *        description: API-ERROR[BadRequest] The user already exists
 *      404:
 *        description: Not found
 *      422:
 *        description: Validation Error
 *      500:
 *        description: Internal Server Error
 *
 * definitions:
 *   userLoginRes:
 *     type: object
 *     properties:
 *       user:
 *         type: object
 *         $ref: "#/components/schemas/UserDTO"
 *       accessToken:
 *         type: string
 *         description: Access token.
 *       refreshToken:
 *         type: string
 *         description: Refresh token.
 *       message:
 *         type: string
 *         example: Пользователь успешно вошел в систему
 * */

router.post('/logout', userController.logout) // authMiddleware,
/**
 * @swagger
 * /api/user/logout:
 *  post:
 *    summary: Logout user.
 *    tags: [User]
 *    description: Logout user.
 *    requestBody:
 *      headers:
 *             Set-Cookie:
 *               schema:
 *                 type: string
 *                 example: refreshToken=REFRESH_TOKEN Path=/; HttpOnly;
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *
 *    responses:
 *      200:
 *        description: The User logout.
 *        headers:
 *             Set-Cookie:
 *               schema:
 *                 type: string
 *                 example: refreshToken=REFRESH_TOKEN Path=/; HttpOnly;
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: The User logout.
 *                  example: Пользователь успешно вышел из системы
 *      400:
 *        description: API-ERROR[BadRequest] The user already exists
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal Server Error
 * */

router.patch('/:id', updateValidation, userController.update) // authMiddleware, permissionsMiddleware(['can-all', 'can-all-user', 'user-update']),
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
 *         200:
 *           description: Successful response
 *           schema:
 *             $ref: "#/components/schemas/User"
 *         400:
 *           description: API-ERROR[BadRequest] User does not exist
 *         404:
 *           description: Not found
 *         422:
 *           description: Validation Error
 *         500:
 *           description: Internal Server Error
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

router.get('/activate/:link', userController.activate)        // authMiddleware
/**
 * @swagger
 * /api/user/activate/{link}:
 *   get:
 *     summary: Activated a new User.
 *     description: Activated a new User.
 *     tags: [User]
 *     parameters:
 *         - name: {link}
 *           in: '#/components/schemas/User.activationLink'
 *           required: true
 *           type: string
 *           description: activation link
 *     responses:
 *       200:
 *         description: User activated and redirect to client url.
 *       400:
 *         description: API-ERROR[BadRequest] User does not exist
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server Error
 *
 */

router.get('/refresh', userController.refresh) // authMiddleware,
/**
 * @swagger
 * /api/user/refresh:
 *   get:
 *     summary: Refresh tokens.
 *     tags: [User]
 *     description: Refresh tokens.
 *     headers:
 *             Set-Cookie:
 *               schema:
 *                 type: string
 *                 example: refreshToken=REFRESH_TOKEN Path=/; HttpOnly;
 *     responses:
 *       200:
 *         description: Token refreshed.
 *       400:
 *         description: API-ERROR[BadRequest] User does not exist
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server Error
 *
 */

router.get('/all', userController.getAllUsers)        // authMiddleware, permissionsMiddleware(['can-all', 'can-all-user', 'users-read']),
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
 *       400:
 *         description: API-ERROR[BadRequest] User does not exist
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server Error
 *
 */

router.get('/:id', userController.getUser)       // authMiddleware, permissionsMiddleware(['can-all', 'can-all-user', 'user-read']), settingsMiddleware
/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Get user by ID.
 *     description: Get user by ID.
 *     tags: [User]
 *     parameters:
 *         - name: {id}
 *           in: '#/components/schemas/User'
 *           required: true
 *           type: string
 *           format: GUID
 *           description: The GUID of a specific user
 *     responses:
 *       200:
 *         description: Get user by ID.
 *       400:
 *         description: API-ERROR[BadRequest] User does not exist
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server Error
 *
 */

router.delete('/remove/:id', userController.remove) // authMiddleware, permissionsMiddleware(['can-all', 'can-all-user', 'user-delete']),
/**
 * @swagger
 * /api/user/remove/{id}:
 *  delete:
 *      summary: Delete user by ID.
 *      description: Delete user by ID
 *      tags: [User]
 *      parameters:
 *         - name: {id}
 *           in: '#/components/schemas/User'
 *           required: true
 *           type: string
 *           format: GUID
 *           description: The GUID of a specific user
 *      responses:
 *          200:
 *              description: User that was deleted
 *          400:
 *              description: API-ERROR[BadRequest] User does not exist
 *          404:
 *              description: Not found
 *          500:
 *              description: Internal Server Error
 */

router.patch('/:id/like', userController.likeUser)    // updateValidation
/**
 * @swagger
 * /api/user/{id}/like:
 *     patch:
 *       summary: Like the user by ID
 *       tags: [User]
 *       description: Like the user by ID.
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
 *         200:
 *           description: Successful response
 *           schema:
 *             $ref: "#/components/schemas/User"
 *         400:
 *           description: API-ERROR[BadRequest] User does not exist
 *         404:
 *           description: Not found
 *         422:
 *           description: Validation Error
 *         500:
 *           description: Internal Server Error
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

router.patch('/:id/unlike', userController.unlikeUser)    // updateValidation
/**
 * @swagger
 * /api/user/{id}/unlike:
 *     patch:
 *       summary: Unlike the user by ID
 *       tags: [User]
 *       description: Unlike the user by ID.
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
 *         200:
 *           description: Successful response
 *           schema:
 *             $ref: "#/components/schemas/User"
 *         400:
 *           description: API-ERROR[BadRequest] User does not exist
 *         404:
 *           description: Not found
 *         422:
 *           description: Validation Error
 *         500:
 *           description: Internal Server Error
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

router.patch('/:id/dislike', userController.dislikeUser)    // updateValidation
/**
 * @swagger
 * /api/user/{id}/dislike:
 *     patch:
 *       summary: Dislike the user by ID
 *       tags: [User]
 *       description: Dislike the user by ID.
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
 *         200:
 *           description: Successful response
 *           schema:
 *             $ref: "#/components/schemas/User"
 *         400:
 *           description: API-ERROR[BadRequest] User does not exist
 *         404:
 *           description: Not found
 *         422:
 *           description: Validation Error
 *         500:
 *           description: Internal Server Error
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

router.patch('/:id/undislike', userController.undislikeUser)    // updateValidation
/**
 * @swagger
 * /api/user/{id}/undislike:
 *     patch:
 *       summary: UnDislike the user by ID
 *       tags: [User]
 *       description: UnDislike the user by ID.
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
 *         200:
 *           description: Successful response
 *           schema:
 *             $ref: "#/components/schemas/User"
 *         400:
 *           description: API-ERROR[BadRequest] User does not exist
 *         404:
 *           description: Not found
 *         422:
 *           description: Validation Error
 *         500:
 *           description: Internal Server Error
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

router.patch('/data/:id', userController.updateUserData) // updateValidation
/**
 * @swagger
 * /api/userdata/{id}:
 *     patch:
 *       summary: Update a user data by ID
 *       tags: [User]
 *       description: Update a user data by ID.
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
 *         200:
 *           description: Successful response
 *           schema:
 *             $ref: "#/components/schemas/User"
 *         400:
 *           description: API-ERROR[BadRequest] User does not exist
 *         404:
 *           description: Not found
 *         422:
 *           description: Validation Error
 *         500:
 *           description: Internal Server Error
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

router.get('/data/:id', userController.getUserData)
/**
 * @swagger
 * /api/user/data/{id}:
 *   get:
 *     summary: Get user data by ID.
 *     description: Get user data by ID.
 *     tags: [User]
 *     parameters:
 *         - name: {id}
 *           in: '#/components/schemas/User'
 *           required: true
 *           type: string
 *           format: GUID
 *           description: The GUID of a specific user
 *     responses:
 *       200:
 *         description: Get user by ID.
 *       400:
 *         description: API-ERROR[BadRequest] User does not exist
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server Error
 *
 */

router.get('/stats/:id', userController.getUserStats)
/**
 * @swagger
 * /api/user/stats/{id}:
 *   get:
 *     summary: Get user stats by ID.
 *     description: Get user stats by ID.
 *     tags: [User]
 *     parameters:
 *         - name: {id}
 *           in: '#/components/schemas/User'
 *           required: true
 *           type: string
 *           format: GUID
 *           description: The GUID of a specific user
 *     responses:
 *       200:
 *         description: Get user by ID.
 *       400:
 *         description: API-ERROR[BadRequest] User does not exist
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server Error
 *
 */

router.post('/ban/:id', userController.issueBan)
/**
 * @swagger
 * /api/user/ban/{id}:
 *  post:
 *    summary: Issue a ban to the user.
 *    tags: [User]
 *    parameters:
 *         - name: {id}
 *           in: '#/components/schemas/User'
 *           required: true
 *           type: string
 *           format: GUID
 *           description: The GUID of a specific user
 *    description: Issue a ban to the user by ID.
 *    requestBody:
 *      headers:
 *             Set-Cookie:
 *               schema:
 *                 type: string
 *                 example: refreshToken=REFRESH_TOKEN Path=/; HttpOnly;
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *
 *    responses:
 *      200:
 *        description: The User logout.
 *        headers:
 *             Set-Cookie:
 *               schema:
 *                 type: string
 *                 example: refreshToken=REFRESH_TOKEN Path=/; HttpOnly;
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: The User logout.
 *                  example: Пользователь успешно вышел из системы
 *      400:
 *        description: API-ERROR[BadRequest] The user already exists
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal Server Error
 * */

router.get('/ban/:banId', userController.getUserBan)
/**
 * @swagger
 * /api/user/ban/{banId}:
 *   get:
 *     summary: Get user ban by ID.
 *     description: Get user ban by ID.
 *     tags: [User]
 *     parameters:
 *         - name: {banId}
 *           in: '#/components/schemas/Ban'
 *           required: true
 *           type: string
 *           format: GUID
 *           description: The GUID of a specific user
 *     responses:
 *       200:
 *         description: Get user by ID.
 *       400:
 *         description: API-ERROR[BadRequest] User does not exist
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server Error
 *
 */

router.get('/bans/:id', userController.getUserBans)
/**
 * @swagger
 * /api/user/bans/{id}:
 *   get:
 *     summary: Get user ban by ID.
 *     description: Get user ban by ID.
 *     tags: [User]
 *     parameters:
 *         - name: {id}
 *           in: '#/components/schemas/User'
 *           required: true
 *           type: string
 *           format: GUID
 *           description: The GUID of a specific user
 *     responses:
 *       200:
 *         description: Get user by ID.
 *       400:
 *         description: API-ERROR[BadRequest] User does not exist
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server Error
 *
 */

router.patch('/ban/:id', userController.updateUserBan) // updateValidation
/**
 * @swagger
 * /api/ban/{id}:
 *     patch:
 *       summary: Update a user ban by ID
 *       tags: [User]
 *       description: Update a user ban by ID.
 *       parameters:
 *         - name: {id}
 *           in: '#/components/schemas/Ban'
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
 *         200:
 *           description: Successful response
 *           schema:
 *             $ref: "#/components/schemas/User"
 *         400:
 *           description: API-ERROR[BadRequest] User does not exist
 *         404:
 *           description: Not found
 *         422:
 *           description: Validation Error
 *         500:
 *           description: Internal Server Error
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

export const userRouter = router