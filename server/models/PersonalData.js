import mongoose, {Schema} from 'mongoose'

const PersonalDataSchema = new mongoose.Schema({
		userID: {type: Schema.Types.ObjectId, ref: 'User', required: true},       // unique: true
		phone: {type: String, default: null},
		nickName: {type: String, default: null},
		surName: {type: String, default: null},
		firstName: {type: String, default: null},
		patronymic: {type: String, default: null},
		birthDate: {type: String, default: null},
		gender: {type: String, default: null},
		avatarURL: {type: String, default: null},
	},
	{
		timestamps: true,
	})

export default mongoose.model('Personal.Data', PersonalDataSchema)

/**
 * @swagger
 * components:
 *   schemas:
 *     PersonalData:
 *       type: object
 *       required:
 *        - userID
 *       properties:
 *         userID:
 *           type: object
 *           $ref: '#/components/schemas/User'
 *           format: GUID
 *           example: '63ff446467f7015de43dfeb9'
 *           description: User ID.
 *         avatarURL:
 *           type: string
 *           format: url
 *           default: null
 *           description: The user's avatar link.
 *         surName:
 *           type: string
 *           minLength: 3
 *           maxLength: 20
 *           default: null
 *           description: User surname.
 *         firstName:
 *           type: string
 *           minLength: 3
 *           maxLength: 20
 *           default: null
 *           description: User firstname.
 *         patronymic:
 *           type: string
 *           minLength: 3
 *           maxLength: 20
 *           default: null
 *           description: User patronymic.
 *         gender:
 *           type: string
 *           default: null
 *           description: User gender.
 *         birthDate:
 *           type: string
 *           format: date
 *           example: "12-05-2023"
 *           default: null
 *           description: The user's date of birth.
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

/**
 * @swagger
 * components:
 *   schemas:
 *     PersonalDataDTO:
 *       type: object
 *       required:
 *       properties:
 *         _id:
 *           type: string
 *           unique: true
 *           example: 63ff446467f7015de43dfeaf
 *           description: User ID.
 *         email:
 *           type: string
 *           format: email
 *           unique: true
 *           example: user@mail.com
 *           description: User email.
 *         isActivated:
 *           type: boolean
 *           default: false
 *           description: User activated.
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
