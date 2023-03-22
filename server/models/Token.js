import mongoose, {Schema} from 'mongoose'

/**
 * @swagger
 * components:
 *   schemas:
 *     Token:
 *       type: object
 *       required:
 *        - refreshToken
 *        - user
 *       properties:
 *         user:
 *           type: object
 *           $ref: '#/components/schemas/User'
 *         refreshToken:
 *           type: string
 *           description: Refresh Token.
 *         ip:
 *           type: string
 *           format: ipv4
 *           example: "127.0.0.1"
 *           description: A token was created from this ip.
 *         fingerPrint:
 *           type: string
 *           description: Browser fingerprint.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "12-05-2023"
 *           description: Timestamp of token created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "12-05-2023"
 *           description: Timestamp of token updated.
 */

const TokenSchema = new mongoose.Schema({
      user: {type: Schema.Types.ObjectId, ref: 'User'},
      refreshToken: {type: String, required: true},
      ip: {type: String, default: null},
      fingerPrint: {type: String, default: null},
    },
    {
      timestamps: true,
    })

export default mongoose.model('Token', TokenSchema)