import mongoose, { Date } from 'mongoose'
import {Bool} from "mongoose/lib/schema/index.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     Ban:
 *       type: object
 *       required:
 *        - bannedUser
 *        - banIssuedUser
 *        - banType
 *        - banDuration
 *        - description
 *        - isBanned
 *       properties:
 *         bannedUserID:
 *           type: string
 *           format: GUID
 *           description: ID of the banned user.
 *         banIssuedUserID:
 *           type: string
 *           format: GUID
 *           description: ID user issued the ban.
 *         banType:
 *           type: string
 *           default: 'BAN'
 *           example: 'BAN'
 *           description: Type of ban ('BAN' or 'PERMIT'(not work)).
 *         banPermissions:
 *           type: array
 *           items:
 *             type: object
 *             $ref: '#/components/schemas/Permission'
 *             format: GUID
 *           default: null
 *           example: ['ID_PERM', 'ID_PERM']
 *           description: Ban permissions list.
 *         banDuration:
 *           type: string
 *           format: date-time
 *           example: "12-05-2023"
 *           description: Ban duration date-time.
 *         description:
 *           type: string
 *           description: Description of the ban.
 *         isBanned:
 *           type: boolean
 *           default: true
 *           example: true
 *           description: Ban.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of ban created.
 *           example: "12-05-2023"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of ban updated.
 *           example: "12-05-2023"
 */

const BanSchema = new mongoose.Schema({
		bannedUserID: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
		banIssuedUserID: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
		banType: {type: String, default: 'BAN', required: true, upperCase: true},                   // 'BAN' - general ban; 'PERMIT' - permission ban(NOT WORK)
		banPermissions: [{type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null}],
		banStart: {type: Date, required: true},                                                   // timestamp
		banDuration: {type: String, required: true},                                                // Ms
		banExpire: {type: Date, required: true},
		isActive: {type: Boolean, required: true, default: true},
		// banExpire: {
		// 	type: Number,
		// 	default: function() {
		// 		return this.banStart + this.banDuration
		// 	},
		// 	set: v => this.banStart + 10
		// },
		// isActive: {
		// 	type: Boolean,
		// 	default: function() {
		// 		const nowDate = 5 // Date
		// 		return nowDate <= this.banExpire
		// 	}
		// },
		description: {type: String, required: true, default: null},
	},
	{
		timestamps: true,
	})

export default mongoose.model('Ban', BanSchema)