export class UserStatsDto {
  id
  userID
  likePostList
  dislikePostList
  likeUserList
  dislikeUserList
  wishList
  createdAt
  updatedAt

  constructor(model) {
    this.id = model._id
    this.userID = model.userID
    this.likePostList = model.likePostList
    this.dislikePostList = model.dislikePostList
    this.likeUserList = model.likeUserList
    this.dislikeUserList = model.dislikeUserList
    this.wishList = model.wishList
    this.createdAt = model.createdAt
    this.updatedAt = model.updatedAt
  }
}