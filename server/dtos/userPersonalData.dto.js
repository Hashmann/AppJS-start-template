export class UserPersonalDataDto {
  userID
  email
  roles
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
    this.userID = model.userID._id
    this.email = model.userID.email
    // this.roles = model.userID.roles
    this.roles = this.getTitleRolesPerm(model.userID.roles)
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

  getTitleRolesPerm(roles) {
    const rolesTitleList = {}
    for (let role in roles) {
      const permTitleList = []
      for (let perm in roles[role].permissions) {
        permTitleList.push(roles[role].permissions[perm].title)
      }
      rolesTitleList[roles[role].title] = permTitleList
    }
    return rolesTitleList
  }
}