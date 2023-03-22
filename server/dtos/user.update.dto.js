export class UserUpdateDto {
	id
	phone
	roles
	isActivated
	activationLink
	activatedAt
	resetPassLink
	isOnline
	likeList
	dislikeList
	banList
	createdAt
	updatedAt
	// nickName
	// surName
	// firstName
	// patronymic
	// birthDate
	// gender
	// avatarURL

	constructor(model) {
		this.id = model._id
		this.phone = model.phone
		this.roles = model.roles
		this.isActivated = model.isActivated
		this.activationLink = model.activationLink
		this.activatedAt = model.activatedAt
		this.resetPassLink = model.resetPassLink
		this.isOnline = model.isOnline
		this.likeList = model.likeList
		this.dislikeList = model.dislikeList
		this.banList = model.banList
		this.createdAt = model.createdAt
		this.updatedAt = model.updatedAt
		// this.nickName = model.nickName
		// this.surName = model.surName
		// this.firstName = model.firstName
		// this.patronymic = model.patronymic
		// this.birthDate = model.birthDate
		// this.gender = model.gender
		// this.avatarURL = model.avatarURL
	}
}