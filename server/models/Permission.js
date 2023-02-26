import mongoose from 'mongoose'

/**
 * @swagger
 * components:
 *   schemas:
 *     Permission:
 *       type: object
 *       required:
 *        - title
 *       properties:
 *         _id:
 *           type: integer
 *           example: 63e3a52807200ac23d9bada1
 *           description: The permission ID.
 *         title:
 *           type: string
 *           unique: true
 *           description: Permission title.
 *         description:
 *           type: string
 *           description: Description of the permission.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of permission created.
 *           example: "12-05-2023"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of permission updated.
 *           example: "12-05-2023"
 */

const PermissionSchema = new mongoose.Schema({
		title: {type: String, required: true, unique: true},
		description: {type: String},
	},
	{
		timestamps: true,
	})

export default mongoose.model('Permission', PermissionSchema)