import mongoose, {Schema} from 'mongoose'

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *        - title
 *        - content
 *        - author
 *       properties:
 *         title:
 *           type: string
 *           unique: true
 *           description: Post title.
 *         content:
 *           type: string
 *         userID:
 *           type: object
 *           $ref: '#/components/schemas/User'
 *           description: Comment creator.
 *         postID:
 *           type: object
 *           $ref: '#/components/schemas/Post'
 *           description: Comment to post.
 *         toUserID:
 *           type: object
 *           $ref: '#/components/schemas/User'
 *           description: Comment to user.
 *         imagesUrl:
 *           type: array
 *           items:
 *             type: String
 *             example: /urlToImage
 *             description: Post title.
 *           example: ['URL', 'URL']
 *           default: []
 *           description: Url images.
 *         isPublished:
 *           type: boolean
 *           example: false
 *           default: true
 *           description: Is published?.
 *         viewsCount:
 *           type: number
 *           default: 0
 *           example: 0
 *           description: Count of comment views.
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

const CommentSchema = new mongoose.Schema({
		title: {type: String, default: null},
		content: {type: String, required: true},
		userID: {type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null},
		postID: {type: mongoose.Schema.Types.ObjectId, ref: 'Post', default: null},
		toUserID: {type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null},
		imagesUrl: [{type: String, default: null}],
		isPublished: {type: Boolean, default: false},
		viewsCount: {type: Number, default: 0},  // ?????
		likeList: [{type: Schema.Types.ObjectId, ref: 'User', default: null}],
		dislikeList: [{type: Schema.Types.ObjectId, ref: 'User', default: null}],
	},
	{
		timestamps: true,
	})

export default mongoose.model('Comment', CommentSchema)