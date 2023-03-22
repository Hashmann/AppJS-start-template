import mongoose from 'mongoose'
import { slugGenerator } from '../utils/utils.js'

/**
 * @swagger
 * components:
 *   schemas:
 *     Tag:
 *       type: object
 *       required:
 *        - title
 *        - slug
 *       properties:
 *         title:
 *           type: string
 *           unique: true
 *           description: Tag title.
 *         slug:
 *           type: string
 *           unique: true
 *           description: Tag slug.
 *         description:
 *           type: string
 *           default: null
 *           description: Description tag.
 *         imageUrl:
 *           type: string
 *           format: URL
 *           example: /link
 *           default: null
 *           description: Link to image.
 *         viewsCount:
 *           type: number
 *           default: 0
 *           example: 0
 *           description: Count of tag views.
 *         parentTag:
 *           type: object
 *           properties:
 *             $ref: '#/components/schemas/Tag'
 *           default: null
 *           description: Parent tag ID.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of tag created.
 *           example: "12-05-2023"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of tag updated.
 *           example: "12-05-2023"
 */

const TagSchema = new mongoose.Schema({
		title: {type: String, required: true, unique: true},
		// slug: {
		// 	type: String,
		// 	required: true,
		// 	unique: true,
		// 	default: function() {
		// 		return slugGenerator(this.title)
		// 	}
		// },
		slug: {type: String, required: true, unique: true},
		description: {type: String, default: null},
		imageUrl: {type: String, default: null},
		viewsCount: {type: Number, default: 0},
		parentTag: {type: mongoose.Schema.Types.ObjectId, ref: 'Tag', default: null},
	},
	{
		timestamps: true,
	})

export default mongoose.model('Tag', TagSchema)