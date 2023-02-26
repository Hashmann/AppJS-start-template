import mongoose from 'mongoose'
import Permission from './Permission.js'

/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       required:
 *        - title
 *        - permissions
 *       properties:
 *         _id:
 *           type: integer
 *           example: 63e3a52807200ac23d9bada1
 *           description: Role ID.
 *         title:
 *           type: string
 *           unique: true
 *           example: USER
 *           description: Role title.
 *         permissions:
 *           type: array
 *           items:
 *             type: string
 *           example: ['can-all', 'can-post-read', 'can-post-create']
 *           description: Role permissions.
 *         description:
 *           type: string
 *           description: Description of the role.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of role created.
 *           example: "12-05-2023"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of role updated.
 *           example: "12-05-2023"
 */

const RoleSchema = new mongoose.Schema({
		title: {type: String, required: true, unique: true},
		permissions: [{type: String, ref: 'Permission', required: true}],
		description: {type: String},
	},
	{
		timestamps: true,
	})

export default mongoose.model('Role', RoleSchema)