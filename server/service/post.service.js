import PostModel from '../models/Post.js'
import TagModel from '../models/Tag.js'
import CategoryModel from '../models/Category.js'
import UserModel from '../models/User.js'
import RoleModel from '../models/Role.js'
import StatsModel from '../models/Stats.js'
import CommentModel from '../models/Comment.js'
import { ApiError } from '../exceptions/api.error.js'
import { Logger } from '../utils/logger.utils.js'
import {
	saveSlugsToLocalSettings,
	slugGenerator,
	trimStringObjData,
	verifyIdLength
} from '../utils/utils.js'

class PostService {
	// Create a new post
	async create(authorId, postData) {
		verifyIdLength(authorId)
		const post = await PostModel.findOne({title: postData.title}).lean()
		if (post) throw ApiError.BadRequest(`Такой пост: ${post.title} уже существует`)
		const category = await CategoryModel.findById(postData.category).lean()
		if (!category) throw ApiError.BadRequest(`Такой категории не существует`)
		const author = await UserModel.findById(authorId)
		if (!author) throw ApiError.BadRequest(`Такого пользователя не существует`)
		postData = trimStringObjData(postData)
		const slug = slugGenerator(postData.title)
		postData = {...postData, slug, author: authorId}
		const newPost = await PostModel.create(postData)
		const postPop = await PostModel.findById(newPost._id)
			.populate({
				path: 'category',
				select: ['_id', 'title', 'slug', 'description', 'imageUrl', 'parentCategory'],
				populate: {
					path: 'parentCategory',
					select: ['_id', 'title', 'slug', 'description', 'imageUrl', 'parentCategory']
				}
			})
			.populate({
				path: 'tags',
				select: ['_id', 'title', 'slug', 'description', 'imageUrl', 'parentTag'],
				populate: {
					path: 'parentTag',
					select: ['_id', 'title', 'slug', 'description', 'imageUrl', 'parentTag']
				}
			})
			.populate('author', ['_id', 'email'])
			.populate('likeList', ['_id', 'email'])
			.populate('dislikeList', ['_id', 'email'])
			.populate('wishList', ['_id', 'email'])
			.populate({
				path: 'comments',
				select: ['_id', 'content', 'userID', 'isPublished', 'likeList', 'dislikeList'],
				populate: {
					path: 'userID',
					select: ['_id', 'email']
				}
			})
			.lean()
		await saveSlugsToLocalSettings()
		return postPop
	}

	// Update post
	async update(userId, postId, postData) {
		verifyIdLength(postId)
		verifyIdLength(userId)
		const postById = await PostModel.findById(postId).lean()
		if (!postById) throw ApiError.BadRequest(`Такой пост не существует`)
		const userById = await UserModel.findById(userId)
		if (!userById) throw ApiError.BadRequest(`Такого пользователя не существует`)
		const category = await CategoryModel.findById(postData.category).lean()
		if (!category) throw ApiError.BadRequest(`Такой категории не существует`)
		const adminRole = await RoleModel.findOne({title: 'ADMIN'}).lean()
		const superAdminRole = await RoleModel.findOne({title: 'SUPER-ADMIN'}).lean()
		if (postById.author !== userId || !userById.roles.includes(adminRole._id) || !userById.roles.includes(superAdminRole._id)) {
			throw ApiError.BadRequest(`Вы не можете редактировать этот пост`)
		}
		postData = trimStringObjData(postData)
		const slug = slugGenerator(postData.title)
		postData = {...postData, slug}
		const updatePost = await PostModel.findByIdAndUpdate(postId, postData, {returnDocument: 'after'})
			.populate({
				path: 'category',
				select: ['_id', 'title', 'slug', 'description', 'imageUrl', 'parentCategory'],
				populate: {
					path: 'parentCategory',
					select: ['_id', 'title', 'slug', 'description', 'imageUrl', 'parentCategory']
				}
			})
			.populate({
				path: 'tags',
				select: ['_id', 'title', 'slug', 'description', 'imageUrl', 'parentTag'],
				populate: {
					path: 'parentTag',
					select: ['_id', 'title', 'slug', 'description', 'imageUrl', 'parentTag']
				}
			})
			.populate('author', ['_id', 'email'])
			.populate('likeList', ['_id', 'email'])
			.populate('dislikeList', ['_id', 'email'])
			.populate('wishList', ['_id', 'email'])
			.populate({
				path: 'comments',
				select: ['_id', 'content', 'userID', 'isPublished', 'likeList', 'dislikeList'],
				populate: {
					path: 'userID',
					select: ['_id', 'email']
				}
			})
			.lean()
		await saveSlugsToLocalSettings(postId, slug)
		return updatePost
	}

	// Delete a post by ID
	async remove(postId, userId) {
		verifyIdLength(postId)
		verifyIdLength(userId)
		const postById = await PostModel.findById(postId)
		if (!postById) throw ApiError.BadRequest(`Такой пост не существует`)
		const userById = await UserModel.findById(userId)
		if (!userById) throw ApiError.BadRequest(`Такого пользователя не существует`)
		const adminRole = await RoleModel.findOne({title: 'ADMIN'}).lean()
		const superAdminRole = await RoleModel.findOne({title: 'SUPER-ADMIN'}).lean()
		if (postById.author !== userId || !userById.roles.includes(adminRole._id) || !userById.roles.includes(superAdminRole._id)) {
			throw ApiError.BadRequest(`Вы не можете удалить этот пост`)
		}
		const deletePost = await PostModel.findByIdAndDelete(postId)
			.populate({
				path: 'category',
				select: ['_id', 'title', 'slug', 'description', 'imageUrl', 'parentCategory'],
				populate: {
					path: 'parentCategory',
					select: ['_id', 'title', 'slug', 'description', 'imageUrl', 'parentCategory']
				}
			})
			.populate({
				path: 'tags',
				select: ['_id', 'title', 'slug', 'description', 'imageUrl', 'parentTag'],
				populate: {
					path: 'parentTag',
					select: ['_id', 'title', 'slug', 'description', 'imageUrl', 'parentTag']
				}
			})
			.populate('author', ['_id', 'email'])
			.populate('likeList', ['_id', 'email'])
			.populate('dislikeList', ['_id', 'email'])
			.populate('wishList', ['_id', 'email'])
			.populate({
				path: 'comments',
				select: ['_id', 'content', 'userID', 'isPublished', 'likeList', 'dislikeList'],
				populate: {
					path: 'userID',
					select: ['_id', 'email']
				}
			})
			.lean()
		await saveSlugsToLocalSettings()
		return deletePost
	}

	// Get one post by ID
	async getPost (postSlug) {
		const postById = await PostModel.findOneAndUpdate({slug: postSlug}, {$inc: {viewsCount: 1},}, {returnDocument: 'after'})
			.populate({
				path: 'category',
				select: ['_id', 'title', 'slug', 'description', 'imageUrl', 'parentCategory'],
				populate: {
					path: 'parentCategory',
					select: ['_id', 'title', 'slug', 'description', 'imageUrl', 'parentCategory']
				}
			})
			.populate({
				path: 'tags',
				select: ['_id', 'title', 'slug', 'description', 'imageUrl', 'parentTag'],
				populate: {
					path: 'parentTag',
					select: ['_id', 'title', 'slug', 'description', 'imageUrl', 'parentTag']
				}
			})
			.populate('author', ['_id', 'email'])
			.populate('likeList', ['_id', 'email'])
			.populate('dislikeList', ['_id', 'email'])
			.populate('wishList', ['_id', 'email'])
			.populate({
				path: 'comments',
				select: ['_id', 'content', 'userID', 'isPublished', 'likeList', 'dislikeList'],
				populate: {
					path: 'userID',
					select: ['_id', 'email']
				}
			})
			.lean()
		if (!postById) throw ApiError.BadRequest(`Такой пост не существует`)
		return postById
	}

	// Get all posts
	async getAllPosts () {
		const posts = await PostModel.find()
			.populate({
				path: 'category',
				select: ['_id', 'title', 'slug', 'description', 'imageUrl', 'parentCategory'],
				populate: {
					path: 'parentCategory',
					select: ['_id', 'title', 'slug', 'description', 'imageUrl', 'parentCategory']
				}
			})
			.populate({
				path: 'tags',
				select: ['_id', 'title', 'slug', 'description', 'imageUrl', 'parentTag'],
				populate: {
					path: 'parentTag',
					select: ['_id', 'title', 'slug', 'description', 'imageUrl', 'parentTag']
				}
			})
			.populate('author', ['_id', 'email'])
			.populate('likeList', ['_id', 'email'])
			.populate('dislikeList', ['_id', 'email'])
			.populate('wishList', ['_id', 'email'])
			.populate({
				path: 'comments',
				select: ['_id', 'content', 'userID', 'isPublished', 'likeList', 'dislikeList'],
				populate: {
					path: 'userID',
					select: ['_id', 'email']
				}
			})
			.lean()
		return posts
	}

	// Get all post from category
	async getPostFromCategory (categorySlug) {
		const category = await CategoryModel.findOne({slug: categorySlug})
		if (!category) throw ApiError.BadRequest(`Такой категории не существует`)
		const posts = await PostModel.find({category: category._id})
			.populate({
				path: 'category',
				select: ['_id', 'title', 'slug', 'description', 'imageUrl', 'parentCategory'],
				populate: {
					path: 'parentCategory',
					select: ['_id', 'title', 'slug', 'description', 'imageUrl', 'parentCategory']
				}
			})
			.populate({
				path: 'tags',
				select: ['_id', 'title', 'slug', 'description', 'imageUrl', 'parentTag'],
				populate: {
					path: 'parentTag',
					select: ['_id', 'title', 'slug', 'description', 'imageUrl', 'parentTag']
				}
			})
			.populate('author', ['_id', 'email'])
			.populate('likeList', ['_id', 'email'])
			.populate('dislikeList', ['_id', 'email'])
			.populate('wishList', ['_id', 'email'])
			.populate({
				path: 'comments',
				select: ['_id', 'content', 'userID', 'isPublished', 'likeList', 'dislikeList'],
				populate: {
					path: 'userID',
					select: ['_id', 'email']
				}
			})
			.lean()
		return posts
	}

	// Get all post by tags
	async getPostsWithTags (tagsQuery) {
		const tags = tagsQuery.split('?')
		const tagsIds = []
		for (let tag in tags) {
			const tagDb = await TagModel.findOne({slug: tags[tag]})
			tagsIds.push(tagDb._id)
		}
		const posts = await PostModel.where('tags').in(tagsIds)
			.populate({
				path: 'category',
				select: ['_id', 'title', 'slug', 'description', 'imageUrl', 'parentCategory'],
				populate: {
					path: 'parentCategory',
					select: ['_id', 'title', 'slug', 'description', 'imageUrl', 'parentCategory']
				}
			})
			.populate({
				path: 'tags',
				select: ['_id', 'title', 'slug', 'description', 'imageUrl', 'parentTag'],
				populate: {
					path: 'parentTag',
					select: ['_id', 'title', 'slug', 'description', 'imageUrl', 'parentTag']
				}
			})
			.populate('author', ['_id', 'email'])
			.populate('likeList', ['_id', 'email'])
			.populate('dislikeList', ['_id', 'email'])
			.populate('wishList', ['_id', 'email'])
			.populate({
				path: 'comments',
				select: ['_id', 'content', 'userID', 'isPublished', 'likeList', 'dislikeList'],
				populate: {
					path: 'userID',
					select: ['_id', 'email']
				}
			})
			.lean()
		return posts
	}

	// Get all posts by tag
	async getPostsWithTag (tagSlug) {
		const tag = await TagModel.findOne({slug: tagSlug})
		if (!tag) throw ApiError.BadRequest(`Такого тега не существует`)
		const posts = await PostModel.find({tags: tag})
			.populate({
				path: 'category',
				select: ['_id', 'title', 'slug', 'description', 'imageUrl', 'parentCategory'],
				populate: {
					path: 'parentCategory',
					select: ['_id', 'title', 'slug', 'description', 'imageUrl', 'parentCategory']
				}
			})
			.populate({
				path: 'tags',
				select: ['_id', 'title', 'slug', 'description', 'imageUrl', 'parentTag'],
				populate: {
					path: 'parentTag',
					select: ['_id', 'title', 'slug', 'description', 'imageUrl', 'parentTag']
				}
			})
			.populate('author', ['_id', 'email'])
			.populate('likeList', ['_id', 'email'])
			.populate('dislikeList', ['_id', 'email'])
			.populate('wishList', ['_id', 'email'])
			.populate({
				path: 'comments',
				select: ['_id', 'content', 'userID', 'isPublished', 'likeList', 'dislikeList'],
				populate: {
					path: 'userID',
					select: ['_id', 'email']
				}
			})
			.lean()
		return posts
	}

	// Get all post by author
	async getPostByAuthor (authorId) {
		verifyIdLength(authorId)
		const posts = await PostModel.find({author: authorId})
			.populate({
				path: 'category',
				select: ['_id', 'title', 'slug', 'description', 'imageUrl', 'parentCategory'],
				populate: {
					path: 'parentCategory',
					select: ['_id', 'title', 'slug', 'description', 'imageUrl', 'parentCategory']
				}
			})
			.populate({
				path: 'tags',
				select: ['_id', 'title', 'slug', 'description', 'imageUrl', 'parentTag'],
				populate: {
					path: 'parentTag',
					select: ['_id', 'title', 'slug', 'description', 'imageUrl', 'parentTag']
				}
			})
			.populate('author', ['_id', 'email'])
			.populate('likeList', ['_id', 'email'])
			.populate('dislikeList', ['_id', 'email'])
			.populate('wishList', ['_id', 'email'])
			.populate({
				path: 'comments',
				select: ['_id', 'content', 'userID', 'isPublished', 'likeList', 'dislikeList'],
				populate: {
					path: 'userID',
					select: ['_id', 'email']
				}
			})
			.lean()
		return posts
	}

	// Get all post from category with tags
	async getPostFromCategoryWithTags (categorySlug, tagsQuery) {
		const category = await CategoryModel.findOne({slug: categorySlug})
		if (!category) throw ApiError.BadRequest(`Такой категории не существует`)
		const tags = tagsQuery.split('?')
		const tagsIds = []
		for (let tag in tags) {
			const tagDb = await TagModel.findOne({slug: tags[tag]})
			tagsIds.push(tagDb._id)
		}
		const posts = await PostModel.find({category: category._id}).where('tags').in(tagsIds)
			.populate({
				path: 'category',
				select: ['_id', 'title', 'slug', 'description', 'imageUrl', 'parentCategory'],
				populate: {
					path: 'parentCategory',
					select: ['_id', 'title', 'slug', 'description', 'imageUrl', 'parentCategory']
				}
			})
			.populate({
				path: 'tags',
				select: ['_id', 'title', 'slug', 'description', 'imageUrl', 'parentTag'],
				populate: {
					path: 'parentTag',
					select: ['_id', 'title', 'slug', 'description', 'imageUrl', 'parentTag']
				}
			})
			.populate('author', ['_id', 'email'])
			.populate('likeList', ['_id', 'email'])
			.populate('dislikeList', ['_id', 'email'])
			.populate('wishList', ['_id', 'email'])
			.populate({
				path: 'comments',
				select: ['_id', 'content', 'userID', 'isPublished', 'likeList', 'dislikeList'],
				populate: {
					path: 'userID',
					select: ['_id', 'email']
				}
			})
			.lean()
		return posts
	}

	// Like post
	async likePost(likePostId, likesUserId) {
		verifyIdLength(likePostId)
		verifyIdLength(likesUserId)
		const post = await PostModel.findById(likePostId).lean()
		if (post.likeList.includes(likesUserId)) throw ApiError.BadRequest(`Вам уже нравится этот комментарий`)
		const likePost = await PostModel.findByIdAndUpdate(likePostId, {
			$push: {likeList: likesUserId},
			$pull: {dislikeList: likesUserId}
		})
		const likesUser = await StatsModel.findOneAndUpdate({userID: likesUserId}, {
			$push: {likePostList: likePostId},
			$pull: {dislikePostList: likePostId}
		})
	}

	// Unlike post
	async unlikePost(unlikePostId, unlikesUserId) {
		verifyIdLength(unlikePostId)
		verifyIdLength(unlikesUserId)
		const unlikePost = await PostModel.findByIdAndUpdate(unlikePostId, {
			$pull: {likeList: unlikesUserId}
		})
		const unlikesUser = await StatsModel.findOneAndUpdate({userID: unlikesUserId}, {
			$pull: {likePostList: unlikePostId}
		})
	}

	// Dislike post
	async dislikePost(dislikePostId, dislikesUserId) {
		verifyIdLength(dislikePostId)
		verifyIdLength(dislikesUserId)
		const post = await PostModel.findById(dislikePostId).lean()
		if (post.dislikeList.includes(dislikesUserId)) throw ApiError.BadRequest(`Вам уже не нравится этот комментарий`)
		const dislikePost = await PostModel.findByIdAndUpdate(dislikePostId, {
			$push: {dislikeList: dislikesUserId},
			$pull: {likeList: dislikesUserId}
		})
		const dislikesUser = await StatsModel.findOneAndUpdate({userID: dislikesUserId}, {
			$push: {dislikePostList: dislikePostId},
			$pull: {likePostList: dislikePostId}
		})
	}

	// Undislike post
	async undislikePost(undislikePostId, undislikesUserId) {
		verifyIdLength(undislikePostId)
		verifyIdLength(undislikesUserId)
		const undislikePost = await PostModel.findByIdAndUpdate(undislikePostId, {
			$pull: {dislikeList: undislikesUserId}
		})
		const undislikesUser = await StatsModel.findOneAndUpdate({userID: undislikesUserId}, {
			$pull: {dislikePostList: undislikePostId}
		})
	}

	// Add the post in wishlist
	async wishlistPost(wishlistPostId, wishlistUserId) {
		verifyIdLength(wishlistPostId)
		verifyIdLength(wishlistUserId)
		const post = await PostModel.findById(wishlistPostId).lean()
		if (post.wishList.includes(wishlistUserId)) throw ApiError.BadRequest(`Этот пост уже избранном`)
		const wishlistPost = await PostModel.findByIdAndUpdate(wishlistPostId, {
			$push: {wishList: wishlistUserId},
		})
		const wishlistUser = await StatsModel.findOneAndUpdate({userID: wishlistUserId}, {
			$push: {wishList: wishlistPostId},
		})
	}

	// Remove the post in wishlist
	async unwishlistPost(unwishlistPostId, unwishlistUserId) {
		verifyIdLength(unwishlistPostId)
		verifyIdLength(unwishlistUserId)
		const unwishlistPost = await PostModel.findByIdAndUpdate(unwishlistPostId, {
			$pull: {wishList: unwishlistUserId},
		})
		const unwishlistUser = await StatsModel.findOneAndUpdate({userID: unwishlistUserId}, {
			$pull: {wishList: unwishlistPostId},
		})
	}

	// Create a new comment for post by ID
	async createComment(postId, commentUserId, commentData) {
		verifyIdLength(postId)
		verifyIdLength(commentUserId)
		const postById = await PostModel.findById(postId)
		if (!postById) throw ApiError.BadRequest(`Такой пост не существует`)
		commentData = trimStringObjData(commentData)
		commentData = {...commentData, userID: commentUserId, postID: postId}
		const comment = await CommentModel.create(commentData)
		const post = await PostModel.findByIdAndUpdate(postId, {$push: {comments: comment._id}}, {returnDocument: 'after'})
			.populate({
				path: 'category',
				select: ['_id', 'title', 'slug', 'description', 'imageUrl', 'parentCategory'],
				populate: {
					path: 'parentCategory',
					select: ['_id', 'title', 'slug', 'description', 'imageUrl', 'parentCategory']
				}
			})
			.populate({
				path: 'tags',
				select: ['_id', 'title', 'slug', 'description', 'imageUrl', 'parentTag'],
				populate: {
					path: 'parentTag',
					select: ['_id', 'title', 'slug', 'description', 'imageUrl', 'parentTag']
				}
			})
			.populate('author', ['_id', 'email'])
			.populate('likeList', ['_id', 'email'])
			.populate('dislikeList', ['_id', 'email'])
			.populate('wishList', ['_id', 'email'])
			.populate({
				path: 'comments',
				select: ['_id', 'content', 'userID', 'isPublished', 'likeList', 'dislikeList'],
				populate: {
					path: 'userID',
					select: ['_id', 'email']
				}
			})
			.lean()
		return post
	}

	async getPostComments(postId) {
		verifyIdLength(postId)
		const postById = await PostModel.findById(postId)
		if (!postById) throw ApiError.BadRequest(`Такой пост не существует`)
		const postComments = await CommentModel.find({postID: postId})
			.populate({
				path: 'userID',
				select: ['_id', 'email']
			})
			.populate('likeList')
			.populate('dislikeList')
		return postComments
	}
}

export const postService = new PostService()