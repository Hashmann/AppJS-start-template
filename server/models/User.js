import mongoose from 'mongoose'

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
    },
    {
      timestamps: true,
    })

export default mongoose.model('User', UserSchema)