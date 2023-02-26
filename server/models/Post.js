import mongoose from 'mongoose'
import Permission from './Permission.js'

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *        - title
 *        - content
 *        - user
 *       properties:
 *         _id:
 *           type: integer
 *           example: 63e3a52807200ac23d9bada1
 *           description: Post ID.
 *         title:
 *           type: string
 *           unique: true
 *           description: Post title.
 *         content:
 *           type: string
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           example: ['post', 'tag']
 *           description: Post tags.
 *         viewsCount:
 *           type: number
 *           description: Post view counter.
 *         user:
 *           type: object
 *           $ref: '#/components/schemas/User'
 *           description: Post creator.
 *         imageUrl:
 *           type: string
 *           format: URL
 *           example: /link
 *           description: Link to image.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of post created.
 *           example: "12-05-2023"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of post updated.
 *           example: "12-05-2023"
 */

const PostSchema = new mongoose.Schema({
		title: {type: String, required: true, unique: true},
		content: {type: String, required: true},
		tags: {type: Array, default: [],},
		viewsCount: {type: Number, default: 0,},
		user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
		imageUrl: {type: String},
	},
	{
		timestamps: true,
	})

export default mongoose.model('Post', PostSchema)