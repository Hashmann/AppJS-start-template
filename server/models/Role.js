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
 *         title:
 *           type: string
 *           unique: true
 *           example: USER
 *           description: Role title.
 *         parentRole:
 *           type: object
 *           properties:
 *             $ref: '#/components/schemas/Role'
 *           default: null
 *           description: Parent role ID.
 *         permissions:
 *           type: array
 *           items:
 *             type: string
 *           example: ['can-all', 'can-post-read', 'can-post-create']
 *           description: Role permissions.
 *         description:
 *           type: string
 *           default: null
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
		parentRole: {type: mongoose.Schema.Types.ObjectId, ref: 'Role', default: null},
		permissions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Permission', required: true}],
		description: {type: String, default: null},
	},
	{
		timestamps: true,
	})

export default mongoose.model('Role', RoleSchema)