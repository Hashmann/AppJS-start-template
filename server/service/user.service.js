import bcrypt from 'bcrypt'
import UserModel from '../models/User.js'
import RoleModel from '../models/Role.js'
import PersonalDataModel from '../models/PersonalData.js'
import StatsModel from '../models/Stats.js'
import BanModel from '../models/Ban.js'
import { UserPersonalDataDto } from '../dtos/userPersonalData.dto.js'
import { UserStatsDataDto } from '../dtos/userStatsData.dto.js'
import { mailService } from './mail.service.js'
import { tokenService } from './token.service.js'
import { v4 as uuidv4 } from 'uuid'
import { ApiError } from '../exceptions/api.error.js'
import { Logger } from '../utils/logger.utils.js'
import { UserUpdateDto } from '../dtos/user.update.dto.js'
import {
  createPersonalData,
  createUserStats,
  getUserDTO,
  verifyIdLength,
  calculationBan,
  trimStringObjData, checkBansExpire
} from '../utils/utils.js'

class UserService {
  // Registration account
  async register(email, password) {
    email = email.trim()
    password = password.trim()
    const candidate = await UserModel.findOne({email})
    if (candidate) {
      Logger.warning(`Пользователь с email: ${email} уже существует`,'user.service','','WARNING')
      throw ApiError.BadRequest(`Пользователь с email: ${email} уже существует`)
    }
    const hashPassword = await bcrypt.hash(password,3)
    const activationLink = uuidv4()
    const resetPassLink = uuidv4()
    const rolesGuest = await RoleModel.findOne({title: 'GUEST'})
    const roles = []
    roles.push(rolesGuest._id)
    const user = await UserModel.create({
      email,
      password: hashPassword,
      activationLink,
      resetPassLink,
      roles,
    })
    await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`)
    const personalData = await createPersonalData(user)
    const userStats = await createUserStats(user)
    return await getUserDTO(user)
  }
  // Activation account
  async activate(activationLink){
    const user = await UserModel.findOne({activationLink})
    if (!user) throw ApiError.BadRequest('Некоррктная ссылка активации')
    const userRole = await RoleModel.findOne({title: 'USER'})
    const roles = []
    roles.push(userRole._id)
    await UserModel.updateOne({
      activationLink: activationLink,
    },{
      isActivated: true,
      activatedAt: (new Date()).toISOString().slice(0,50),
      activationLink: null,
      roles: roles,
    })
    return user
  }
  // Log in
  async login(email, password) {
    email = email.trim()
    password = password.trim()
    const user = await UserModel.findOne({email})
    if (!user) throw ApiError.BadRequest('Пользователь с таким email не найден')
    const isPassEquals = await bcrypt.compare(password, user.password)
    if (!isPassEquals) throw ApiError.BadRequest('Неверный логин или пароль')
    if (user.banList.length !== 0) await checkBansExpire(user._id)
    return await getUserDTO(user)
  }
  // Log out
  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken)
    return token
  }
  // Update user
  async update(userId, updateData) {
    verifyIdLength(userId)
    const userById = await UserModel.findById(userId)
    if (!userById) throw ApiError.BadRequest('Пользователь не найден')
    const user = await UserModel.findOneAndUpdate({email: userById.email}, {...updateData})
    const userDto = new UserUpdateDto(user)
    const updatedUser = await UserModel.findById(userById)
    const updatedUserDto = new UserUpdateDto(updatedUserDto)
    return {
      before: {userDto},
      after: {updatedUserDto}
    }
  }
  // Delete user by ID
  async remove(userId) {
    verifyIdLength(userId)
    const userById = await RoleModel.findById(userId)
    if (!userById) throw ApiError.BadRequest(`Такого пользователя не существует`)
    const superAdminRole = await RoleModel.findOne({title: 'SUPER-ADMIN'}).lean()
    const adminRole = await RoleModel.findOne({title: 'ADMIN'}).lean()
    if (userById.roles.includes(superAdminRole._id) || userById.roles.includes(adminRole._id)) throw ApiError.BadRequest(`Нельзя удалить пользователя`)
    await RoleModel.findOneAndDelete(userId)
  }
  // Refresh Token
  async refresh(refreshToken) {
    if (!refreshToken) throw ApiError.UnauthorizedError()
    const userData = await tokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await tokenService.findToken(refreshToken)
    if (!userData || !tokenFromDb) throw ApiError.UnauthorizedError()
    const user = await UserModel.findById(userData.id)
    return await getUserDTO(user)
  }
  // Get all users
  async getAllUsers() {
    const users = await UserModel.find()
      .populate({
      path: 'roles',
      populate: {
        path: 'permissions',
        model: 'Permission'
      }
    }).exec()
    return users
  }
  // Get user by ID
  async getUser(userId) {
    verifyIdLength(userId)
    const user = await UserModel.findOneAndUpdate(
      {
      _id: userId
      }, {
        $inc: {viewsCount: 1},
      }, {
        returnDocument: 'after',
      }
    ).populate({
      path: 'roles',
      populate: {
        path: 'permissions',
        model: 'Permission'
      }
    }).exec()
    return user
  }
  // Like user
  async likeUser(likedUserId, likesUserId) {
    verifyIdLength(likedUserId)
    verifyIdLength(likesUserId)
    const user = await UserModel.findById(likedUserId).lean()
    if (user.likeList.includes(likesUserId)) throw ApiError.BadRequest(`Вам уже нравится этот пользователь`)
    const likedUser = await UserModel.findByIdAndUpdate(likedUserId, {
      $push: {likeList: likesUserId},
      $pull: {dislikeList: likesUserId}
    })
    const likesUser = await StatsModel.findOneAndUpdate({userID: likesUserId}, {
      $push: {likeUserList: likedUserId},
      $pull: {dislikeUserList: likedUserId}
    })
  }
  // Unlike user
  async unlikeUser(unlikedUserId, unlikesUserId) {
    verifyIdLength(unlikedUserId)
    verifyIdLength(unlikesUserId)
    const unlikedUser = await UserModel.findByIdAndUpdate(unlikedUserId, {
      $pull: {likeList: unlikesUserId}
    })
    const unlikesUser = await StatsModel.findOneAndUpdate({userID: unlikesUserId}, {
      $pull: {likeUserList: unlikedUserId}
    })
  }
  // Dislike user
  async dislikeUser(dislikedUserId, dislikesUserId) {
    verifyIdLength(dislikedUserId)
    verifyIdLength(dislikesUserId)
    const user = await UserModel.findById(dislikedUserId).lean()
    if (user.dislikeList.includes(dislikesUserId)) throw ApiError.BadRequest(`Вам уже не нравится этот пользователь`)
    const dislikedUser = await UserModel.findByIdAndUpdate(dislikedUserId, {
      $push: {dislikeList: dislikesUserId},
      $pull: {likeList: dislikesUserId},
    })
    const dislikesUser = await StatsModel.findOneAndUpdate({userID: dislikesUserId}, {
      $push: {dislikeUserList: dislikedUserId},
      $pull: {likeUserList: dislikedUserId},
    })
  }
  // Undislike user
  async undislikeUser(undislikedUserId, undislikesUserId) {
    verifyIdLength(undislikedUserId)
    verifyIdLength(undislikesUserId)
    const undislikedUser = await UserModel.findByIdAndUpdate(undislikedUserId, {
      $pull: {dislikeList: undislikesUserId}
    })
    const undislikesUser = await StatsModel.findOneAndUpdate({userID: undislikesUserId}, {
      $pull: {dislikeUserList: undislikedUserId}
    })
  }
  // Update personal data
  async updateUserData(userId, updateUserData) {
    verifyIdLength(userId)
    const userById = await UserModel.findById(userId)
    if (!userById) throw ApiError.BadRequest('Пользователь не найден')
    const personalData = await PersonalDataModel.findOne({userID: userId})
    if (!personalData) Logger.warning('User personal data not found', 'user.service','', 'WARNING')
    updateUserData = trimStringObjData(updateUserData)
    const updatePersonalData = await PersonalDataModel.findOneAndUpdate({userID: userId}, updateUserData, {returnDocument: 'after'})
      .populate({
        path: 'userID',
        populate: {
          path: 'roles',
          populate: {
            path: 'permissions'
          }
        }
      })
    return new UserPersonalDataDto(updatePersonalData)
  }
  // Get user personal data
  async getUserData(userId) {
    verifyIdLength(userId)
    const userById = await UserModel.findById(userId)
    if (!userById) throw ApiError.BadRequest('Пользователь не найден')
    const personalData = await PersonalDataModel.findOne({userID: userId})
      .populate({
        path: 'userID',
        populate: {
          path: 'roles',
          populate: {
            path: 'permissions'
          }
        }
      })
    if (!personalData) Logger.warning('User personal data not found', 'user.service','', 'WARNING')
    return new UserPersonalDataDto(personalData)
  }
  // Get user stats
  async getUserStats(userId) {
    verifyIdLength(userId)
    const userById = await UserModel.findById(userId).lean()
    if (!userById) throw ApiError.BadRequest('Пользователь не найден')
    const userStats = await StatsModel.findOne({userID: userId}).lean()
    if (!userStats) Logger.warning('User stats not found', 'user.service','', 'WARNING')
    const userStatsData = {...userStats, ...userById}
    return new UserStatsDataDto(userStatsData)
  }
  // Issue ban
  async issueBan(userId, banIssuedUserId, banData) {
    verifyIdLength(userId)
    verifyIdLength(banIssuedUserId)
    const userById = await UserModel.findById(userId).lean()
    if (!userById) throw ApiError.BadRequest('Пользователь не найден')
    const superAdminRole = await RoleModel.findOne({title: 'SUPER-ADMIN'}).lean()
    if (userById.roles.includes(superAdminRole._id)) throw ApiError.BadRequest(`Нельзя выдать бан`)
    banData = trimStringObjData(banData)
    const userBan = await BanModel.create({
      bannedUserID: userId,
      banIssuedUserID: banIssuedUserId,
      ...banData
    })
    await UserModel.findByIdAndUpdate(userId, {
      $push: {banList: userBan._id},
    })
    return userBan
  }
  // Get all user bans data
  async getUserBans(userId) {
    verifyIdLength(userId)
    const bansById = await BanModel.find({bannedUserID: userId}).populate('bannedUserID').lean()
    if (!bansById) throw ApiError.BadRequest('У пользователя нет банов')
    return bansById
  }
  // Get ban data by ID
  async getUserBan(banId) {
    verifyIdLength(banId)
    const banById = await BanModel.findById(banId).lean()
    if (!banById) throw ApiError.BadRequest('Данных о таком бане нет')
    return banById
  }
  // Update ban data by ID
  async updateUserBan(banId, banData) {
    verifyIdLength(banId)
    const banById = await BanModel.findById(banId).lean()
    if (!banById) throw ApiError.BadRequest('Данных о таком бане нет')
    banData = trimStringObjData(banData)
    banData = calculationBan(banData)
    const updateBan = await BanModel.findByIdAndUpdate(banId, banData, {returnDocument: 'after', /**upsert: true*/})
    return updateBan
  }
}

export const userService = new UserService()