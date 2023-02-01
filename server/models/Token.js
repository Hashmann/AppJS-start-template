import mongoose, {Schema} from 'mongoose'

const TokenSchema = new mongoose.Schema({
      user: {type: Schema.Types.ObjectId, ref: 'User'},
      refreshToken: {type: String, required: true},
      ip: {type: String},
      fingerPrint: {type: String},
    },
    {
      timestamps: true,
    })

export default mongoose.model('Token', TokenSchema)