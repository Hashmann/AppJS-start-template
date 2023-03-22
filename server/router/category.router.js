import Router from 'express'
import { categoryController } from '../controllers/category.controller.js'
import { categoryValidation } from '../validations/category.validation.js'

const router = new Router()

router.post('/create', categoryValidation, categoryController.create)
/**
 * @swagger
 * /api/category/create:
 *  post:
 *    summary: Create new category.
 *    tags: [Category]
 *    description: Create new category.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: "#/components/schemas/Category"
 *
 *    responses:
 *      200:
 *        description: New Category was successfully created.
 *        content:
 *          application/json:
 *            schema:
 *              allOf:
 *                - $ref: "#/components/schemas/Category"
 *                - type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      maxLength: 200
 *                      example: "Category create"
 *
 *      400:
 *        description: API-ERROR[BadRequest] The post already exists
 *      404:
 *        description: Not found
 *      500:
 *        description: Unexpected error
 * */

router.patch('/update/:id', categoryValidation, categoryController.update)
/**
 * @swagger
 * /api/category/{id}:
 *     patch:
 *       summary: Update a category by ID
 *       tags: [Category]
 *       description: Update category by ID.
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
 *             $ref: "#/components/schemas/Category"
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

router.delete('/remove/:id', categoryController.remove)
/**
 * @swagger
 * /api/category/{id}:
 *  delete:
 *      summary: Delete category by ID.
 *      description: Delete category by ID
 *      tags: [Category]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: string id of category to delete
 *      responses:
 *          200:
 *              description: Category that was deleted
 */

router.get('/', categoryController.getAllCategories)
/**
 * @swagger
 * /api/category/:
 *   get:
 *     summary: Get all categories.
 *     tags: [Category]
 *     description: Get all categories.
 *     responses:
 *       200:
 *         description: All categories received.
 *
 */

router.get('/:id', categoryController.getCategory)
/**
 * @swagger
 * /api/category/{id}:
 *   get:
 *     summary: Get category by ID.
 *     tags: [Category]
 *     description: Get category by ID.
 *     responses:
 *       200:
 *         description: Category received.
 *
 */

export const categoryRouter = router


