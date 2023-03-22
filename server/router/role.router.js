import Router from 'express'
import { roleController } from '../controllers/role.controller.js'
import { roleValidation } from '../validations/role.validation.js'
import permissionsMiddleware from '../middlewares/permissions.middleware.js'

const router = new Router()

router.post('/create', roleValidation, roleController.create) // permissionsMiddleware(['can-all', 'can-all-role', 'role-create']),
/**
 * @swagger
 * /api/role/create:
 *  post:
 *    summary: Create new role.
 *    tags: [Role]
 *    description: Create new user role.
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
 *                example: manager
 *                description: Title of the role.
 *              permissions:
 *                type: array
 *                items:
 *                  type: string
 *                example: ['user', 'admin']
 *                description: Permissions for the role.
 *              description:
 *                type: string
 *                example: This role is for managers
 *                description: Description of the role.
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

router.patch('/update/:id', roleValidation, roleController.update) // permissionsMiddleware(['can-all', 'can-all-role', 'role-update']),
/**
 * @swagger
 * /api/role/{id}:
 *     patch:
 *       summary: Update a role by ID
 *       tags: [Role]
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
 *             $ref: "#/components/schemas/Role"
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

router.delete('/remove/:id', roleController.remove) // permissionsMiddleware(['can-all', 'can-all-role', 'role-delete']),
/**
 * @swagger
 * /api/role/{id}:
 *  delete:
 *      summary: Delete role by ID.
 *      description: Delete role by ID
 *      tags: [Role]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: string id of role to delete
 *      responses:
 *          200:
 *              description: Role that was deleted
 */

router.get('/', roleController.getAllRoles) // permissionsMiddleware(['can-all', 'can-all-role', 'roles-read']),
/**
 * @swagger
 * /api/role/:
 *   get:
 *     summary: Get all roles.
 *     tags: [Role]
 *     description: Get all roles.
 *     responses:
 *       200:
 *         description: All roles received.
 *
 */

router.get('/:id', roleController.getRole) // permissionsMiddleware(['can-all', 'can-all-role', 'role-read']),
/**
 * @swagger
 * /api/role/{id}:
 *   get:
 *     summary: Get role by ID.
 *     tags: [Role]
 *     description: Get role by ID.
 *     responses:
 *       200:
 *         description: Role received.
 *
 */

export const roleRouter = router