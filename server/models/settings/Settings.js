import mongoose from 'mongoose'

/**
 * @swagger
 * components:
 *   schemas:
 *     Settings:
 *       type: object
 *       required:
 *        - email
 *        - password
 *       properties:
 *         _id:
 *           type: integer
 *           example: 63e3a52807200ac23d9bada1
 *           description: User ID.
 *         email:
 *           type: string
 *           format: email
 *           unique: true
 *           example: user@mail.com
 *           description: User email.
 *         password:
 *           type: string
 *           format: password
 *           minLength: 3
 *           maxLength: 20
 *           description: User password.
 *         roles:
 *           type: array
 *           items:
 *             type: string
 *           default: user
 *           example: ['SUPER-ADMIN', 'ADMIN', 'MANAGER', 'GUEST', 'USER']
 *           description: User roles.
 *         avatarURL:
 *           type: string
 *           format: url
 *           description: The user's avatar link.
 *         surName:
 *           type: string
 *           minLength: 3
 *           maxLength: 20
 *           description: User surname.
 *         firstName:
 *           type: string
 *           minLength: 3
 *           maxLength: 20
 *           description: User firstname.
 *         patronymic:
 *           type: string
 *           minLength: 3
 *           maxLength: 20
 *           description: User patronymic.
 *         gender:
 *           type: string
 *           description: User gender.
 *         birthDate:
 *           type: string
 *           format: date
 *           example: "12-05-2023"
 *           description: The user's date of birth.
 *         isActivated:
 *           type: boolean
 *           default: false
 *           description: User activated.
 *         activationLink:
 *           type: string
 *           description: The user's activation link.
 *         activatedAt:
 *           type: string
 *           format: date-time
 *           description: Date and time activated account
 *         isOnline:
 *           type: string
 *           description: User online. 'true', 'false' or timestamp
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
		title: {type: String, required: true, unique: true},
		routes: [{type: mongoose.Schema.Types.ObjectId, ref: 'SettingsRoute'}],
	},
	{
		timestamps: true,
	})

export default mongoose.model('Settings', SettingsSchema)