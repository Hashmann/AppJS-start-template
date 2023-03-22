export class PersonalDataDto {
  id
  userID
  phone
  nickName
  surName
  firstName
  patronymic
  birthDate
  gender
  avatarURL
  createdAt
  updatedAt

  constructor(model) {
    this.id = model._id
    this.userID = model.userID
    this.phone = model.phone
    this.nickName = model.nickName
    this.surName = model.surName
    this.firstName = model.firstName
    this.patronymic = model.patronymic
    this.birthDate = model.birthDate
    this.gender = model.gender
    this.avatarURL = model.avatarURL
    this.createdAt = model.createdAt
    this.updatedAt = model.updatedAt
  }
}