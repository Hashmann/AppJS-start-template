import Router from 'express'
import { commentController } from '../controllers/comment.controller.js'
import {userController} from "../controllers/user.controller.js";

const router = new Router()

router.patch('/:id', commentController.update)
/**
 * @swagger
 * /api/comment/{id}:
 *     patch:
 *       summary: Update a comment by ID
 *       tags: [Comment]
 *       description: Update a comment by ID.
 *       parameters:
 *         - name: {id}
 *           in: '#/components/schemas/Comment'
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

router.delete('/remove/:id', commentController.remove) // authMiddleware, permissionsMiddleware(['can-all', 'can-all-user', 'user-delete']),
/**
 * @swagger
 * /api/comment/remove/{id}:
 *  delete:
 *      summary: Delete comment by ID.
 *      description: Delete comment by ID
 *      tags: [Comment]
 *      parameters:
 *         - name: {id}
 *           in: '#/components/schemas/Comment'
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

router.get('/all', commentController.getAllComments)
/**
 * @swagger
 * /api/comment/all:
 *   get:
 *     summary: Get all comments.
 *     tags: [Comment]
 *     description: Get all comments.
 *     responses:
 *       200:
 *         description: Get all comments.
 *       400:
 *         description: API-ERROR[BadRequest] User does not exist
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server Error
 *
 */

router.patch('/:id/like', commentController.likeComment)
/**
 * @swagger
 * /api/comment/{id}/like:
 *     patch:
 *       summary: Like comment by ID
 *       tags: [Comment]
 *       description: Like comment by ID.
 *       parameters:
 *         - name: {id}
 *           in: '#/components/schemas/Comment'
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

router.patch('/:id/unlike', commentController.unlikeComment)
/**
 * @swagger
 * /api/comment/{id}/unlike:
 *     patch:
 *       summary: Unlike comment by ID
 *       tags: [Comment]
 *       description: Unlike comment by ID.
 *       parameters:
 *         - name: {id}
 *           in: '#/components/schemas/Comment'
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

router.patch('/:id/dislike', commentController.dislikeComment)
/**
 * @swagger
 * /api/comment/{id}/dislike:
 *     patch:
 *       summary: Dislike comment by ID
 *       tags: [Comment]
 *       description: Dislike comment by ID.
 *       parameters:
 *         - name: {id}
 *           in: '#/components/schemas/Comment'
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

router.patch('/:id/undislike', commentController.undislikeComment)
/**
 * @swagger
 * /api/comment/{id}/undislike:
 *     patch:
 *       summary: UnDislike comment by ID
 *       tags: [Comment]
 *       description: UnDislike comment by ID.
 *       parameters:
 *         - name: {id}
 *           in: '#/components/schemas/Comment'
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

router.get('/:id', commentController.getComment)
/**
 * @swagger
 * /api/comment/{id}:
 *   get:
 *     summary: Get comment by ID.
 *     description: Get comment by ID.
 *     tags: [Comment]
 *     parameters:
 *         - name: {id}
 *           in: '#/components/schemas/Comment'
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

export const commentRouter = router