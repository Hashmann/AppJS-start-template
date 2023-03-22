import Router from 'express'
import { settingsController } from '../controllers/settings.controller.js'

const router = new Router()

router.patch('/route/:id', settingsController.updateRoute)
/**
 * @swagger
 * /api/settings/route/{id}:
 *     patch:
 *       summary: Update app route by ID
 *       tags: [Settings]
 *       description: Update app route by ID.
 *       parameters:
 *         - name: {id}
 *           in: '#/components/schemas/SettingsRoute'
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

router.patch('/update', settingsController.updateSettings)
/**
 * @swagger
 * /api/settings:
 *     patch:
 *       summary: Update settings app by ID
 *       tags: [Settings]
 *       description: Update settings app by ID.
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

router.get('/route/all', settingsController.getRoutes)
/**
 * @swagger
 * /api/settings/route/all:
 *   get:
 *     summary: Get all app routes.
 *     tags: [Settings]
 *     description: Get all app routes.
 *     responses:
 *       200:
 *         description: Post received.
 *
 */

router.get('/route/:id', settingsController.getRoute)
/**
 * @swagger
 * /api/settings/route/{id}:
 *   get:
 *     summary: Get app route by ID.
 *     tags: [Settings]
 *     parameters:
 *         - name: {id}
 *           in: '#/components/schemas/SettingsRoute'
 *           required: true
 *           type: string
 *           description: Slug category
 *     description: Get app route by ID.
 *     responses:
 *       200:
 *         description: Post received.
 *
 */

router.get('/', settingsController.getSettings)
/**
 * @swagger
 * /api/settings:
 *   get:
 *     summary: Get all app settings.
 *     tags: [Settings]
 *     description: Get all app settings.
 *     responses:
 *       200:
 *         description: Post received.
 *
 */

export const settingsRouter = router