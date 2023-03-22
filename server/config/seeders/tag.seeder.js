import { Logger } from '../../utils/logger.utils.js'
import { slugGenerator } from '../../utils/utils.js'
import TagModel from '../../models/Tag.js'

// Remove collection
export async function clearTagTable() {
	try {
		await TagModel.collection.drop()
		Logger.info('Tag table cleared','SEEDER','Tag','DONE','v')
	} catch (err) {
		Logger.error('Tag table clear','SEEDER','Tag',err,'ERROR')
	}
}

// Ids all tags
export const tagsIds = {}

// Tags
export async function tagsSeeder () {
	try {
		const tags = {
			1: {
				title: 'тест тег',
				description: 'Просто тестовый тег',
				imageUrl: null,
				parentTag: null,
			},
			2: {
				title: 'Технологии',
				description: 'О технологиях',
				imageUrl: null,
				parentTag: null,
			},
			3: {
				title: 'Языки Программирования',
				description: 'О ЯП',
				imageUrl: null,
				parentTag: 'Технологии',
			},
			4: {
				title: 'Пользователи',
				description: 'О пользователях',
				imageUrl: null,
				parentTag: 'Технологии',
			},
			5: {
				title: 'обо всем',
				description: 'Тэг обо всем',
				imageUrl: null,
				parentTag: 'Языки Программирования',
			}
		}
		// Add tags in database
		for (let tag in tags) {
			// Get slug
			const tagSlug = slugGenerator(tags[tag].title)
			const newTag = await TagModel.create({
				title: tags[tag].title.trim(),
				slug: tagSlug,
				description: tags[tag].description.trim(),
				imageUrl: tags[tag].imageUrl === null ? tags[tag].imageUrl : tags[tag].imageUrl.trim(),
			})
			tagsIds[newTag.title] = newTag._id
		}
		// Add parentTag
		for (let tag in tags) {
			if (tags[tag].parentTag) {
				const parentTag = await TagModel.findOne({title: tags[tag].parentTag.trim()})
				const childTag = await TagModel.findOneAndUpdate({
					title: tags[tag].title.trim()
				}, {
					parentTag: parentTag._id
				})
			}
		}
		Logger.info('Tags created','SEEDER','Tag','DONE','v')
	} catch (err) {
		Logger.error('Tags create','SEEDER','Tag',err,'ERROR')
	}
}