import mongoose, {Schema} from 'mongoose'

/**
 * @swagger
 * components:
 *   schemas:
 *     Stats:
 *       type: object
 *       required:
 *        - userID
 *       properties:
 *         userID:
 *           type: object
 *           format: GUID
 *           $ref: '#/components/schemas/User'
 *         likePostList:
 *           type: array
 *           items:
 *             type: object
 *             $ref: '#/components/schemas/Post'
 *             format: GUID
 *           example: [{63ff446467f7015de43dfeb9}, {63ff446467f7015de43dfec3}, {63ff446467f7015de43dfebe}]
 *           default: null
 *           description: List user like post.
 *         dislikePostList:
 *           type: array
 *           items:
 *             type: object
 *             $ref: '#/components/schemas/Post'
 *             format: GUID
 *           example: [{63ff446467f7015de43dfeb9}, {63ff446467f7015de43dfec3}, {63ff446467f7015de43dfebe}]
 *           default: null
 *           description: List user dislike post.
 *         likeUserList:
 *           type: array
 *           items:
 *             type: object
 *             $ref: '#/components/schemas/User'
 *             format: GUID
 *           example: [{63ff446467f7015de43dfeb9}, {63ff446467f7015de43dfec3}, {63ff446467f7015de43dfebe}]
 *           default: null
 *           description: List users like.
 *         dislikeUserList:
 *           type: array
 *           items:
 *             type: object
 *             $ref: '#/components/schemas/User'
 *             format: GUID
 *           example: [{63ff446467f7015de43dfeb9}, {63ff446467f7015de43dfec3}, {63ff446467f7015de43dfebe}]
 *           default: null
 *           description: List users dislike.
 *         wishList:
 *           type: array
 *           items:
 *             type: object
 *             $ref: '#/components/schemas/Post'
 *             format: GUID
 *           example: [{63ff446467f7015de43dfeb9}, {63ff446467f7015de43dfec3}, {63ff446467f7015de43dfebe}]
 *           default: null
 *           description: Wishlist users post.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "12-05-2023"
 *           description: Timestamp of token created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "12-05-2023"
 *           description: Timestamp of token updated.
 */

const StatsSchema = new mongoose.Schema({
		userID: {type: Schema.Types.ObjectId, ref: 'User', required: true},
		likePostList: [{type: Schema.Types.ObjectId, ref: 'Post', default: null}],
		dislikePostList: [{type: Schema.Types.ObjectId, ref: 'Post', default: null}],
		likeUserList: [{type: Schema.Types.ObjectId, ref: 'User', default: null}],
		dislikeUserList: [{type: Schema.Types.ObjectId, ref: 'User', default: null}],
		wishList: [{type: Schema.Types.ObjectId, ref: 'Post', default: null}],
	},
	{
		timestamps: true,
	})

export default mongoose.model('Stats', StatsSchema)