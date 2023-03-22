import { Logger } from '../../utils/logger.utils.js'
import { slugGenerator } from '../../utils/utils.js'
import CategoryModel from '../../models/Category.js'

// Remove collection
export async function clearCategoryTable() {
	try {
		await CategoryModel.collection.drop()
		Logger.info('Category table cleared','SEEDER','Category','DONE','v')
	} catch (err) {
		Logger.error('Category table clear','SEEDER','Category',err,'ERROR')
	}
}

// Ids all categories
export const categoriesIds = {}

// Categories
export async function categoriesSeeder () {
	try {
		const categories = {
			1: {
				title: 'Категория1',
				description: 'Тестовая категория',
				imageUrl: null,
				parentCategory: null,
			},
			2: {
				title: 'Категория2',
				description: 'Тестовая категория',
				imageUrl: null,
				parentCategory: 'Категория1',
			},
			3: {
				title: 'Категория3',
				description: 'Тестовая категория',
				imageUrl: null,
				parentCategory: 'Категория1',
			},
			4: {
				title: 'Категория4',
				description: 'Тестовая категория',
				imageUrl: null,
				parentCategory: 'Категория1',
			},
			5: {
				title: 'Категория5',
				description: 'Тестовая категория',
				imageUrl: null,
				parentCategory: 'Категория2',
			}
		}
		// Add categories in database
		for (let category in categories) {
			// Get slug
			const categorySlug = slugGenerator(categories[category].title.trim())
			const newCategory = await CategoryModel.create({
				title: categories[category].title.trim(),
				description: categories[category].description.trim(),
				imageUrl: categories[category].imageUrl === null ? categories[category].imageUrl : categories[category].imageUrl.trim(),
				slug: categorySlug
			})
			categoriesIds[newCategory.title] = newCategory._id
		}
		// Add parentCategory
		for (let category in categories) {
			if (categories[category].parentCategory) {
				const parentCategory = await CategoryModel.findOne({title: categories[category].parentCategory.trim()})
				const childCategory = await CategoryModel.findOneAndUpdate({
					title: categories[category].title.trim()
				}, {
					parentCategory: parentCategory._id
				})
			}
		}
		Logger.info('Category created','SEEDER','Category','DONE','v')
	} catch (err) {
		Logger.error('Category create','SEEDER','Category',err,'ERROR')
	}
}