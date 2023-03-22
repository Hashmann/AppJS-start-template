export class UserStatsDataDto {
  userID
  email
  likeList
  dislikeList
  viewsCount
  banList
  likePostList
  dislikePostList
  likeUserList
  dislikeUserList
  wishList

  constructor(model) {
    this.userID = model.userID._id
    this.email = model.userID.email
    this.likeList = model.likeList
    this.dislikeList = model.dislikeList
    this.viewsCount = model.viewsCount
    this.banList = model.banList
    this.likePostList = model.likePostList
    this.dislikePostList = model.dislikePostList
    this.likeUserList = model.likeUserList
    this.dislikeUserList = model.dislikeUserList
    this.wishList = model.wishList
  }
}