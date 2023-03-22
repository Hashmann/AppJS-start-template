import PostModel from '../../models/Post.js'
import UserModel from '../../models/User.js'
import StatsModel from '../../models/Stats.js'
import { Logger } from '../../utils/logger.utils.js'
import { faker } from '@faker-js/faker/locale/ru'
import { tagsIds } from './tag.seeder.js'
import { categoriesIds } from './category.seeder.js'
import { seederUser } from './user.seeder.js'
import { slugGenerator } from '../../utils/utils.js'

// Remove collection
export async function clearPostTable() {
	try {
		await PostModel.collection.drop()
		Logger.info('Post table cleared','SEEDER','Post','DONE','v')
	} catch (err) {
		Logger.error('Post table clear','SEEDER','Post',err,'ERROR')
	}
}

// Ids all posts
export const postsIds = {}

// Posts
export async function postsSeeder () {
	try {
		const posts = {
			1: {
				title: faker.lorem.sentence(6),
				content: faker.lorem.paragraphs(5),
				tags: ['Технологии'],
				category: 'Категория3',
				author: 'admin@email.com',
				imageUrl: faker.image.image(),
				isPublished: true,
				likeList: ['admin@email.com', 'manager@email.com'],
				dislikeList: ['user@email.com'],
				wishList: ['user@email.com'],
			},
			2: {
				title: faker.lorem.sentence(6),
				content: faker.lorem.paragraphs(5),
				tags: ['Языки Программирования', 'тест тег'],
				category: 'Категория1',
				author: 'manager@email.com',
				imageUrl: faker.image.image(),
				isPublished: true,
				likeList: ['user-ban@email.com'],
				dislikeList: [],
				wishList: ['user-ban@email.com'],
			},
			3: {
				title: faker.lorem.sentence(6),
				content: faker.lorem.paragraphs(5),
				tags: ['Пользователи'],
				category: 'Категория5',
				author: 'manager-ban@email.com',
				imageUrl: faker.image.image(),
				isPublished: false,
				likeList: [],
				dislikeList: [],
				wishList: [],
			},
			4: {
				title: faker.lorem.sentence(6),
				content: faker.lorem.paragraphs(5),
				tags: ['Пользователи', 'Языки Программирования'],
				category: 'Категория4',
				author: 'super-admin@email.com',
				imageUrl: faker.image.image(),
				isPublished: true,
				likeList: ['admin@email.com', 'manager@email.com', 'user@email.com', 'manager-ban@email.com'],
				dislikeList: ['user-ban@email.com'],
				wishList: ['manager@email.com', 'user@email.com'],
			},
			5: {
				title: faker.lorem.sentence(6),
				content: faker.lorem.paragraphs(5),
				tags: ['обо всем', 'тест тег'],
				category: 'Категория2',
				author: 'admin@email.com',
				imageUrl: faker.image.image(),
				isPublished: true,
				likeList: [],
				dislikeList: ['user-ban@email.com', 'manager@email.com'],
				wishList: [],
			},
			6: {
				title: faker.lorem.sentence(6),
				content: faker.lorem.paragraphs(5),
				tags: ['Пользователи', 'тест тег'],
				category: 'Категория1',
				author: 'admin@email.com',
				imageUrl: faker.image.image(),
				isPublished: true,
				likeList: ['user-ban@email.com', 'manager@email.com'],
				dislikeList: [],
				wishList: [],
			},
		}
		// Add posts in database
		for (let post in posts) {
			// Add ids tags
			const postTags = []
			for (let tag in tagsIds) {
				if (posts[post].tags.includes(tag)) {
					postTags.push(tagsIds[tag])
				}
			}
			// Add ids categories
			let postCategories = ''
			for (let category in categoriesIds) {
				if (posts[post].category.includes(category)) {
					postCategories = categoriesIds[category]
				}
			}
			const postAuthor = await UserModel.findOne({email: posts[post].author})
			// Add ids user likes it
			const userLike = []
			for (let user in seederUser) {
				if (posts[post].likeList.includes(user)) {
					userLike.push(seederUser[user]._id)
				}
			}
			// Add ids user dislikes it
			const userDislike = []
			for (let user in seederUser) {
				if (posts[post].dislikeList.includes(user)) {
					userDislike.push(seederUser[user]._id)
				}
			}
			// Add ids user wishlist
			const wishlist = []
			for (let user in seederUser) {
				if (posts[post].dislikeList.includes(user)) {
					wishlist.push(seederUser[user]._id)
				}
			}
			const newPost = await PostModel.create({
				title: posts[post].title.trim(),
				content: posts[post].content.trim(),
				tags: postTags,
				category: postCategories,
				author: postAuthor._id,
				imageUrl: posts[post].imageUrl.trim(),
				isPublished: posts[post].isPublished,
				likeList: userLike,
				dislikeList: userDislike,
				wishList: wishlist,
				slug: slugGenerator(posts[post].title)
			})
			postsIds[newPost.title] = newPost._id
			// Add user stats
			for (let user in userLike) {
				const userStats = await StatsModel.findOne({userID: userLike[user]})
				userStats.likePostList.push(newPost._id)
				await userStats.save()
			}
			for (let user in userDislike) {
				const userStats = await StatsModel.findOne({userID: userDislike[user]})
				userStats.dislikePostList.push(newPost._id)
				await userStats.save()
			}
			for (let user in wishlist) {
				const userStats = await StatsModel.findOne({userID: wishlist[user]})
				userStats.wishList.push(newPost._id)
				await userStats.save()
			}
		}
		Logger.info('Posts created','SEEDER','Post','DONE','v')
	} catch (err) {
		Logger.error('Posts create','SEEDER','Post',err,'ERROR')
	}
}