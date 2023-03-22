import mongoose, {Schema} from 'mongoose'
import { slugGenerator } from '../utils/utils.js'

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *        - title
 *        - slug
 *        - content
 *        - author
 *       properties:
 *         title:
 *           type: string
 *           unique: true
 *           description: Post title.
 *         slug:
 *           type: string
 *           unique: true
 *           description: Post slug.
 *         content:
 *           type: string
 *         tags:
 *           type: array
 *           items:
 *             type: object
 *             $ref: '#/components/schemas/Tag'
 *           example: ['post', 'tag']
 *           default: []
 *           description: Post tags.
 *         author:
 *           type: object
 *           $ref: '#/components/schemas/User'
 *           description: Post creator.
 *         imageUrl:
 *           type: string
 *           format: URL
 *           example: /link
 *           default: null
 *           description: Link to image.
 *         isPublished:
 *           type: boolean
 *           example: false
 *           default: false
 *           description: Is published?.
 *         viewsCount:
 *           type: number
 *           default: 0
 *           example: 0
 *           description: Count of post views.
 *         likeList:
 *           type: array
 *           items:
 *             type: object
 *             $ref: '#/components/schemas/User'
 *             format: GUID
 *           example: ['63ff446467f7015de43dfeb9', '63ff446467f7015de43dfec3', '63ff446467f7015de43dfebe']
 *           default: null
 *           description: List users like.
 *         dislikeList:
 *           type: array
 *           items:
 *             type: object
 *             $ref: '#/components/schemas/User'
 *             format: GUID
 *           example: ['63ff446467f7015de43dfeb9', '63ff446467f7015de43dfec3', '63ff446467f7015de43dfebe']
 *           default: null
 *           description: List users dislike.
 *         wishList:
 *           type: array
 *           items:
 *             type: object
 *             $ref: '#/components/schemas/User'
 *             format: GUID
 *           example: ['63ff446467f7015de43dfeb9', '63ff446467f7015de43dfec3', '63ff446467f7015de43dfebe']
 *           default: null
 *           description: Wishlist users.
 *         comments:
 *           type: array
 *           items:
 *             type: object
 *             $ref: '#/components/schemas/Comment'
 *             format: GUID
 *           example: ['63ff446467f7015de43dfeb9', '63ff446467f7015de43dfec3', '63ff446467f7015de43dfebe']
 *           default: null
 *           description: Comments.
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
		slug: {
			type: String,
			required: true,
			unique: true,
			// default: function() {
			// 	return slugGenerator(this.title)
			// }
		},
		content: {type: String, required: true},
		tags: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag', default: null,}],
		category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true},
		author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
		imageUrl: {type: String, default: null},
		isPublished: {type: Boolean, default: true},
		viewsCount: {type: Number, default: 0},
		likeList: [{type: Schema.Types.ObjectId, ref: 'User', default: null}],
		dislikeList: [{type: Schema.Types.ObjectId, ref: 'User', default: null}],
		wishList: [{type: Schema.Types.ObjectId, ref: 'User', default: null}],
		comments: [{type: Schema.Types.ObjectId, ref: 'Comment', default: null}],
	},
	{
		timestamps: true,
	})

export default mongoose.model('Post', PostSchema)