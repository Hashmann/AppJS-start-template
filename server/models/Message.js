import mongoose, {Schema} from 'mongoose'

/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       required:
 *        - toUser
 *        - fromUser
 *        - content
 *       properties:
 *         toUser:
 *           type: object
 *           $ref: '#/components/schemas/User'
 *           description: Message to user.
 *         fromUser:
 *           type: object
 *           $ref: '#/components/schemas/User'
 *           description: Message from user.
 *         title:
 *           type: string
 *           default: null
 *           description: Post title.
 *         content:
 *           type: string
 *         imagesUrl:
 *           type: array
 *           items:
 *             type: string
 *             default: null
 *             description: Url images.
 *           example: ['URL', 'URL']
 *           default: []
 *           description: Url images.
 *         readMessage:
 *           type: string
 *           example: date
 *           default: null
 *           description: Date of reading.
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

const MessageSchema = new mongoose.Schema({
		toUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true},
		fromUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true},
		title: {type: String, default: null},
		content: {type: String, required: true},
		imagesUrl: [{type: String, default: null}],
		readMessage: {type: Date, default: null},
	},
	{
		timestamps: true,
	})

export default mongoose.model('Message', MessageSchema)