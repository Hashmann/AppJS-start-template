import mongoose, {Schema} from 'mongoose'

const UserSchema = new mongoose.Schema({
      email: {type: String, required: true, unique: true},
      password: {type: String, required: true},
      resetPassLink: {type: String},
      roles: [{type: mongoose.Schema.Types.ObjectId, ref: 'Role' }], // {type: [String], ref: 'Role', required: true, default: 'GUEST'},
      isActivated: {type: Boolean, default: false},
      activationLink: {type: String},
      activatedAt: {type: String, default: null},
      isOnline: {type: String, default: null},  // ????
      viewsCount: {type: Number, default: 0},
      likeList: [{type: Schema.Types.ObjectId, ref: 'User', default: null}],
      dislikeList: [{type: Schema.Types.ObjectId, ref: 'User', default: null}],
      banList: [{type: mongoose.Schema.Types.ObjectId, ref: 'Ban', default: null}],
    },
    {
      timestamps: true,
    })

export default mongoose.model('User', UserSchema)

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
 *         resetPassLink:
 *           type: string
 *           description: The user's activation link.
 *         roles:
 *           type: array
 *           items:
 *             type: object
 *             $ref: '#/components/schemas/Role'
 *             format: GUID
 *           example: [{ID_SUPER-ADMIN}, {ID_ADMIN}, {ID_MANAGER}, {ID_GUEST}, {ID_USER}]
 *           description: User roles.
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
 *           default: null
 *           description: Date and time activated account
 *         isOnline:
 *           type: string
 *           default: null
 *           description: User online. 'true', 'false' or timestamp
 *         viewsCount:
 *           type: number
 *           default: 0
 *           example: 0
 *           description: Count of user views.
 *         likeList:
 *           type: array
 *           items:
 *             type: object
 *             $ref: '#/components/schemas/User'
 *             format: GUID
 *           example: [{63ff446467f7015de43dfeb9}, {63ff446467f7015de43dfec3}, {63ff446467f7015de43dfebe}]
 *           default: null
 *           description: List users like.
 *         dislikeList:
 *           type: array
 *           items:
 *             type: object
 *             $ref: '#/components/schemas/User'
 *             format: GUID
 *           example: [{63ff446467f7015de43dfeb9}, {63ff446467f7015de43dfec3}, {63ff446467f7015de43dfebe}]
 *           default: null
 *           description: List users dislike.
 *         banList:
 *           type: array
 *           items:
 *             type: object
 *             $ref: '#/components/schemas/Ban'
 *             format: GUID
 *           example: [{63ff446467f7015de43dfeb9}, {63ff446467f7015de43dfec3}, {63ff446467f7015de43dfebe}]
 *           default: null
 *           description: List users ban.
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
 *     UserDTO:
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