import Router from 'express'
import { postController } from '../controllers/post.controller.js'
import { postValidation } from '../validations/post.validation.js'

const router = new Router()

router.post('/create', postValidation, postController.create)
/**
 * @swagger
 * /api/post/create:
 *  post:
 *    summary: Create new post.
 *    tags: [Post]
 *    description: Create new user post.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - title
 *              - content
 *              - user
 *            properties:
 *              title:
 *                type: string
 *                unique: true
 *                description: Title of the post.
 *              tags:
 *                type: array
 *                items:
 *                  type: string
 *                example: ['tag', 'post']
 *                description: Tags for the post.
 *              content:
 *                type: string
 *                description: Content of the post.
 *              user:
 *                type: object
 *                $ref: '#/components/schemas/User'
 *                description: Content of the post.
 *              imageUrl:
 *                type: string
 *                description: Content of the post.
 *
 *    responses:
 *      200:
 *        description: New Post was successfully created.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                post:
 *                  type: object
 *                  properties:
 *                    title:
 *                      type: string
 *                    tags:
 *                      type: array
 *                      items:
 *                        type: string
 *                      example: ['tag', 'post']
 *                    content:
 *                      type: string
 *                    user:
 *                      type: object
 *                      $ref: '#/components/schemas/User'
 *                      description: Post creator.
 *                    imageUrl:
 *                      type: string
 *                      description: Image link.
 *                message:
 *                  type: string
 *                  example: 'OK'
 *      400:
 *        description: API-ERROR[BadRequest] The post already exists
 *      404:
 *        description: Not found
 *      500:
 *        description: Unexpected error
 * */

router.patch('/update/:id', postValidation, postController.update)
/**
 * @swagger
 * /api/post/{id}:
 *     patch:
 *       summary: Update a post by ID
 *       tags: [Post]
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
 *             $ref: "#/components/schemas/Post"
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

router.delete('/remove/:id', postController.remove)
/**
 * @swagger
 * /api/post/{id}:
 *  delete:
 *      summary: Delete post by ID.
 *      description: Delete post by ID
 *      tags: [Post]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: string id of post to delete
 *      responses:
 *          200:
 *              description: Post that was deleted
 */

router.get('/', postController.getAllPosts)
/**
 * @swagger
 * /api/post/:
 *   get:
 *     summary: Get all posts.
 *     tags: [Post]
 *     description: Get all posts.
 *     responses:
 *       200:
 *         description: All posts received.
 *
 */

router.get('/tags', postController.getPostsWithTags)
/**
 * @swagger
 * /api/post/tags/{id}:
 *   get:
 *     summary: Get post by ID.
 *     tags: [Post]
 *     description: Get post by ID.
 *     responses:
 *       200:
 *         description: Post received.
 *
 */

router.get('/category/:categorySlug', postController.getPostFromCategory)
/**
 * @swagger
 * /api/post/category/{categorySlug}:
 *   get:
 *     summary: Get posts from category by slug.
 *     tags: [Post]
 *     parameters:
 *         - name: {categorySlug}
 *           in: '#/components/schemas/Category'
 *           required: true
 *           type: string
 *           description: Slug category
 *     description: Get posts from category by slug.
 *     responses:
 *       200:
 *         description: Post received.
 *
 */

router.get('/tag/:tagSlug', postController.getPostsWithTag)
/**
 * @swagger
 * /api/post/category/{tagSlug}:
 *   get:
 *     summary: Get posts from category by slug.
 *     tags: [Post]
 *     parameters:
 *         - name: {tagSlug}
 *           in: '#/components/schemas/Tag'
 *           required: true
 *           type: string
 *           description: Slug category
 *     description: Get posts from category by slug.
 *     responses:
 *       200:
 *         description: Post received.
 *
 */

router.get('/author/:id', postController.getPostByAuthor)
/**
 * @swagger
 * /api/post/category/{id}:
 *   get:
 *     summary: Get posts from category by slug.
 *     tags: [Post]
 *     parameters:
 *         - name: {id}
 *           in: '#/components/schemas/User'
 *           required: true
 *           type: string
 *           description: Slug category
 *     description: Get posts from category by slug.
 *     responses:
 *       200:
 *         description: Post received.
 *
 */

router.get('/category/:categorySlug/tags', postController.getPostFromCategoryWithTags)
/**
 * @swagger
 * /api/post/category/{categorySlug}/tag:
 *   get:
 *     summary: Get posts from category by slug.
 *     tags: [Post]
 *     parameters:
 *         - name: {categorySlug}
 *           in: '#/components/schemas/Category'
 *           required: true
 *           type: string
 *           description: Slug category
 *     description: Get posts from category by slug.
 *     responses:
 *       200:
 *         description: Post received.
 *
 */

router.patch('/:id/like', postController.likePost)
/**
 * @swagger
 * /api/post/{id}/like:
 *     patch:
 *       summary: Like the post by ID
 *       tags: [User]
 *       description: Like the post by ID.
 *       parameters:
 *         - name: {id}
 *           in: '#/components/schemas/Post'
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

router.patch('/:id/unlike', postController.unlikePost)
/**
 * @swagger
 * /api/post/{id}/unlike:
 *     patch:
 *       summary: Unlike the post by ID
 *       tags: [User]
 *       description: Unlike the post by ID.
 *       parameters:
 *         - name: {id}
 *           in: '#/components/schemas/Post'
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

router.patch('/:id/dislike', postController.dislikePost)
/**
 * @swagger
 * /api/post/{id}/dislike:
 *     patch:
 *       summary: Dislike the post by ID
 *       tags: [User]
 *       description: Dislike the post by ID.
 *       parameters:
 *         - name: {id}
 *           in: '#/components/schemas/Post'
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

router.patch('/:id/undislike', postController.undislikePost)
/**
 * @swagger
 * /api/post/{id}/undislike:
 *     patch:
 *       summary: Undislike the post by ID
 *       tags: [User]
 *       description: Undislike the post by ID.
 *       parameters:
 *         - name: {id}
 *           in: '#/components/schemas/Post'
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

router.patch('/:id/wishlist', postController.wishlistPost)
/**
 * @swagger
 * /api/post/{id}/wishlist:
 *     patch:
 *       summary: Add the post in wishlist by ID
 *       tags: [User]
 *       description: Add the post in wishlist by ID.
 *       parameters:
 *         - name: {id}
 *           in: '#/components/schemas/Post'
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

router.patch('/:id/unwishlist', postController.unwishlistPost)
/**
 * @swagger
 * /api/post/{id}/unwishlist:
 *     patch:
 *       summary: Remove the post in wishlist by ID
 *       tags: [User]
 *       description: Remove the post in wishlist by ID.
 *       parameters:
 *         - name: {id}
 *           in: '#/components/schemas/Post'
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

router.post('/:id/comment', postController.createComment)
/**
 * @swagger
 * /api/post/{id}/comment:
 *  post:
 *    summary: Create new comment for post.
 *    tags: [Post]
 *    parameters:
 *         - name: {id}
 *           in: '#/components/schemas/Post'
 *           required: true
 *           type: string
 *           format: GUID
 *           description: The GUID of a specific user
 *    description: Create new comment for post.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - title
 *              - content
 *              - user
 *            properties:
 *              title:
 *                type: string
 *                unique: true
 *                description: Title of the post.
 *              tags:
 *                type: array
 *                items:
 *                  type: string
 *                example: ['tag', 'post']
 *                description: Tags for the post.
 *              content:
 *                type: string
 *                description: Content of the post.
 *              user:
 *                type: object
 *                $ref: '#/components/schemas/User'
 *                description: Content of the post.
 *              imageUrl:
 *                type: string
 *                description: Content of the post.
 *
 *    responses:
 *      200:
 *        description: New Post was successfully created.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                post:
 *                  type: object
 *                  properties:
 *                    title:
 *                      type: string
 *                    tags:
 *                      type: array
 *                      items:
 *                        type: string
 *                      example: ['tag', 'post']
 *                    content:
 *                      type: string
 *                    user:
 *                      type: object
 *                      $ref: '#/components/schemas/User'
 *                      description: Post creator.
 *                    imageUrl:
 *                      type: string
 *                      description: Image link.
 *                message:
 *                  type: string
 *                  example: 'OK'
 *      400:
 *        description: API-ERROR[BadRequest] The post already exists
 *      404:
 *        description: Not found
 *      500:
 *        description: Unexpected error
 * */

router.get('/:id/comments', postController.getPostComments)
/**
 * @swagger
 * /api/post/{id}/comments:
 *   get:
 *     summary: Get all comments for posts by ID.
 *     tags: [Post]
 *     parameters:
 *         - name: {id}
 *           in: '#/components/schemas/Post'
 *           required: true
 *           type: string
 *           description: Slug category
 *     description: Get all comments for posts by ID.
 *     responses:
 *       200:
 *         description: Post received.
 *
 */

router.get('/:postSlug', postController.getPost)
/**
 * @swagger
 * /api/post/{postSlug}:
 *   get:
 *     summary: Get post by ID.
 *     tags: [Post]
 *     description: Get post by ID.
 *     responses:
 *       200:
 *         description: Post received.
 *
 */



export const postRouter = router