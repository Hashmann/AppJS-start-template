import mongoose from 'mongoose'

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *        - email
 *        - password
 *       properties:
 *         id:
 *           type: integer
 *           example: 63e3a52807200ac23d9bada1
 *           description: The user ID.
 *         email:
 *           type: string
 *           format: email
 *           unique: true
 *           example: user@mail.com
 *           description: The user's email.
 *         password:
 *           type: string
 *           format: password
 *           minLength: 3
 *           maxLength: 20
 *           description: The user's password.
 *         roles:
 *           type: array
 *           items:
 *             type: string
 *           default: user
 *           example: ['user', 'admin']
 *           description: The user's roles.
 *         avatarURL:
 *           type: string
 *           format: url
 *           description: The user's avatar link.
 *         surName:
 *           type: string
 *           minLength: 3
 *           maxLength: 20
 *           description: The user's surname.
 *         firstName:
 *           type: string
 *           minLength: 3
 *           maxLength: 20
 *           description: The user's firstname.
 *         patronymic:
 *           type: string
 *           minLength: 3
 *           maxLength: 20
 *           description: The user's patronymic.
 *         gender:
 *           type: string
 *           description: The user's gender.
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
 *            type: string
 *            format: date-time
 *            description: Date and time activated account
 *         isOnline:
 *           type: boolean
 *           default: false
 *           description: User online.
 *         createdAt:
 *          type: string
 *          format: date-time
 *          description: Timestamp of user created.
 *          example: "12-05-2023"
 *         updatedAt:
 *          type: string
 *          format: date-time
 *          description: Timestamp of user created.
 *          example: "12-05-2023"
 */

const UserSchema = new mongoose.Schema({
      // nickName: {type: String, unique: true},
      email: {type: String, required: true, unique: true},
      password: {type: String, required: true},
      // roles: [{type: String, ref: 'Role', default: 'USER'}],
      avatarURL: {type: String},

      surName: {type: String},
      firstName: {type: String},
      patronymic: {type: String},
      gender: {type: String},

      birthDate: {type: String},

      isActivated: {type: Boolean, default: false},
      activationLink: {type: String},
      activatedAt: {type: String},
    },
    {
      timestamps: true,
    })

export default mongoose.model('User', UserSchema)