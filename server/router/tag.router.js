import Router from 'express'
import { tagController } from '../controllers/tag.controller.js'
import { tagValidation } from '../validations/tag.validation.js'

const router = new Router()

router.post('/create', tagValidation, tagController.create)
/**
 * @swagger
 * /api/tag/create:
 *  post:
 *    summary: Create new tag.
 *    tags: [Tag]
 *    description: Create new tag.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: "#/components/schemas/Tag"
 *
 *    responses:
 *      200:
 *        description: New Tag was successfully created.
 *        content:
 *          application/json:
 *            schema:
 *              allOf:
 *                - $ref: "#/components/schemas/Tag"
 *                - type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      maxLength: 200
 *                      example: "Tag create"
 *
 *      400:
 *        description: API-ERROR[BadRequest] The tag already exists
 *      404:
 *        description: Not found
 *      500:
 *        description: Unexpected error
 * */

router.patch('/update/:id', tagValidation, tagController.update)
/**
 * @swagger
 * /api/tag/{id}:
 *     patch:
 *       summary: Update a tag by ID
 *       tags: [Tag]
 *       description: Update tag by ID.
 *       parameters:
 *         - name: GUID
 *           in: path
 *           required: true
 *           type: string
 *           format: GUID
 *           description: The GUID of a specific tag
 *         - name: JsonPatch
 *           in: body
 *           required: true
 *           schema:
 *             $ref: "#/definitions/PatchRequest"
 *       responses:
 *         '200':
 *           description: Successful response
 *           schema:
 *             $ref: "#/components/schemas/Tag"
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

router.delete('/remove/:id', tagController.remove)
/**
 * @swagger
 * /api/tag/{id}:
 *  delete:
 *      summary: Delete tag by ID.
 *      description: Delete tag by ID
 *      tags: [Tag]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: string id of tag to delete
 *      responses:
 *          200:
 *              description: Tag that was deleted
 */

router.get('/', tagController.getAllTags)
/**
 * @swagger
 * /api/tag/:
 *   get:
 *     summary: Get all tags.
 *     tags: [Tag]
 *     description: Get all tags.
 *     responses:
 *       200:
 *         description: All tags received.
 *
 */

router.get('/:id', tagController.getTag)
/**
 * @swagger
 * /api/tag/{id}:
 *   get:
 *     summary: Get tag by ID.
 *     tags: [Tag]
 *     description: Get tag by ID.
 *     responses:
 *       200:
 *         description: Tag received.
 *
 */

export const tagRouter = router