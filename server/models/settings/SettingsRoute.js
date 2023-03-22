import mongoose from 'mongoose'

/**
 * @swagger
 * components:
 *   schemas:
 *     SettingsRoute:
 *       type: object
 *       required:
 *        - routeUrl
 *        - method
 *       properties:
 *         routeUrl:
 *           type: string
 *           unique: true
 *           example: /api/user/:id
 *           description: url.
 *         description:
 *           type: string
 *           minLength: 3
 *           maxLength: 30
 *           default: null
 *           description: Route description.
 *         params:
 *           type: string
 *           default: null
 *           example: 'id'
 *           description: Url params('id' or 'link').
 *         method:
 *           type: string
 *           default: 'GET'
 *           example: POST
 *           description: http method
 *         controller:
 *           type: string
 *           default: null
 *           example: 'userController.create'
 *           description: Controller
 *         accessPermList:
 *           type: array
 *           items:
 *             type: object
 *             $ref: '#/components/schemas/Permission'
 *             format: GUID
 *           default: user
 *           example: ['ID_PERMISSION']
 *           description: Route access permissions list.
 *         accessRoleList:
 *           type: array
 *           items:
 *             type: object
 *             $ref: '#/components/schemas/Role'
 *             format: GUID
 *           default: user
 *           example: ['ID_ROLE', 'ID_ROLE']
 *           description: Route access roles list.
 *         isCheckAuth:
 *           type: boolean
 *           default: false
 *           description: User patronymic.
 *         isCheckBan:
 *           type: boolean
 *           default: false
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

const SettingsRouteSchema = new mongoose.Schema({
		routeUrl: {type: String, required: true},
		description: {type: String, default: null},
		params: {type: String, default: null},
		method: {type: String, required: true, default: 'GET'},
		controller: {type: String, required: true, default: null},
		accessPermList: [{type: mongoose.Schema.Types.ObjectId, ref: 'Permission', default: null}],
		accessRoleList: [{type: mongoose.Schema.Types.ObjectId, ref: 'Role', default: null}],
		isCheckAuth: {type: Boolean, default: false},
		isCheckBan: {type: Boolean, default: false},
	},
	{
		timestamps: true,
	})

export default mongoose.model('Settings.Route', SettingsRouteSchema)