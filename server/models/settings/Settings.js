import mongoose from 'mongoose'

/**
 * @swagger
 * components:
 *   schemas:
 *     Settings:
 *       type: object
 *       required:
 *        - info
 *       properties:
 *         info:
 *           type: object
 *           default: {}
 *           example: {}
 *           description: Info app.
 *         routes:
 *           type: array
 *           items:
 *             type: object
 *             $ref: '#/components/schemas/SettingsRoute'
 *             format: GUID
 *           default: []
 *           example: ['ID_ROUTE', 'ID_ROUTE']
 *           description: App routes.
 *         settings:
 *           type: object
 *           default: {}
 *           example: {}
 *           description: App settings.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of user created.
 *           example: "12-05-2023"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of user updated.
 *           example: "12-05-2023"
 */

const SettingsSchema = new mongoose.Schema({
		info: {type: Object, default: {}},
		routes: [{type: mongoose.Schema.Types.ObjectId, ref: 'SettingsRoute', required: true}],
		settings: {type: Object, required: true, default: {}},
	},
	{
		timestamps: true,
	})

export default mongoose.model('Settings', SettingsSchema)