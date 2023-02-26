import Router from 'express'
import { permissionController } from '../controllers/permission.controller.js'
import { permissionValidation } from '../validations/permission.validation.js'
import permissionsMiddleware from '../middlewares/permissions.middleware.js'

const router = new Router()

router.post('/create', permissionsMiddleware(['can-all', 'can-all-perm', 'perm-create']), permissionValidation, permissionController.create)
/**
 * @swagger
 * /api/permission/create:
 *  post:
 *    summary: Create new permission.
 *    tags: [Permission]
 *    description: Create new permission.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - title
 *            properties:
 *              title:
 *                type: string
 *                example: create post
 *                description: Can create post.
 *              description:
 *                type: string
 *                example: User can create post
 *                description: Description of the permission.
 *
 *    responses:
 *      200:
 *        description: The new role was successfully created.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                role:
 *                  type: object
 *                  properties:
 *                    title:
 *                      type: string
 *                    permission:
 *                      type: array
 *                      items:
 *                        type: string
 *                      example: ['user', 'admin']
 *                    description:
 *                      type: string
 *                message:
 *                  type: string
 *                  example: 'OK'
 *      400:
 *        description: API-ERROR[BadRequest] The role already exists
 *      404:
 *        description: Not found
 *      500:
 *        description: Unexpected error
 * */

router.patch('/update/:id', permissionsMiddleware(['can-all', 'can-all-perm', 'perm-update']), permissionValidation, permissionController.update)
/**
 * @swagger
 * /api/permission/{id}:
 *     patch:
 *       summary: Update a permission by ID
 *       tags: [Permission]
 *       description: Create new user post.
 *       parameters:
 *         - name: GUID
 *           in: path
 *           required: true
 *           type: string
 *           format: GUID
 *           description: The GUID of a specific user
 *         - name: JsonPatch
 *           in: body
 *           required: true
 *           schema:
 *             $ref: "#/definitions/PatchRequest"
 *       responses:
 *         '200':
 *           description: Successful response
 *           schema:
 *             $ref: "#/components/schemas/Permission"
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

router.delete('/remove/:id', permissionsMiddleware(['can-all', 'can-all-perm', 'perm-delete']), permissionController.remove)
/**
 * @swagger
 * /api/permission/{id}:
 *  delete:
 *      summary: Delete permission by ID.
 *      description: Delete permission by ID
 *      tags: [Permission]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: string id of permission to delete
 *      responses:
 *          200:
 *              description: Permission that was deleted
 */

router.get('/', permissionsMiddleware(['can-all', 'can-all-perm', 'perms-read']), permissionController.getAllPermissions)
/**
 * @swagger
 * /api/permission:
 *   get:
 *     summary: Get all permissions.
 *     tags: [Permission]
 *     description: Get all permissions.
 *     responses:
 *       200:
 *         description: All permissions received.
 *
 */

router.get('/:id', permissionsMiddleware(['can-all', 'can-all-perm', 'perm-read']), permissionController.getPermission)
/**
 * @swagger
 * /api/permission/{id}:
 *   get:
 *     summary: Get permission by ID.
 *     tags: [Permission]
 *     description: Get permission by ID.
 *     responses:
 *       200:
 *         description: Permission received.
 *
 */

export const permissionRouter = router