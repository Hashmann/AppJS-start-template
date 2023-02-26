import Router from 'express'
import { testController } from '../controllers/test.controller.js'

import authMiddleware from '../middlewares/auth.middleware.js'

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

export const testRouter = router