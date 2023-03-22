import mongoose from 'mongoose'
import { slugGenerator } from '../utils/utils.js'

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *        - title
 *        - slug
 *       properties:
 *         title:
 *           type: string
 *           unique: true
 *           description: Category title.
 *         slug:
 *           type: string
 *           unique: true
 *           description: Category slug.
 *         description:
 *           type: string
 *           default: null
 *           description: Description category.
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
 *           description: Count of category views.
 *         parentCategory:
 *           type: object
 *           properties:
 *             $ref: '#/components/schemas/Category'
 *           default: null
 *           description: Parent category ID.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of category created.
 *           example: "12-05-2023"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of category updated.
 *           example: "12-05-2023"
 */

const CategorySchema = new mongoose.Schema({
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
		parentCategory: {type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null},
	},
	{
		timestamps: true,
	})

export default mongoose.model('Category', CategorySchema)