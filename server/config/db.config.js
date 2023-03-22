import { Logger } from '../utils/logger.utils.js'
import { app } from './socket.config.js'
import {saveRoutesToLocalSettings, saveSlugsToLocalSettings} from '../utils/utils.js'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'

dotenv.config({ path: `.env${process.env.NODE_ENV}` })
const MONGO_HOST = process.env.MONGO_DB_HOST
const MONGO_NAME = process.env.MONGO_DB_NAME
mongoose.set('strictQuery', true)

export const dbConnect = async () => {
	try {
		// Connect DB
		await mongoose.connect(`${MONGO_HOST}/${MONGO_NAME}`)
		// Get all models
		const models = Object.keys(mongoose.connection.models)
		app.set('models', models)
		// Get all app routes
		await saveRoutesToLocalSettings()
		// Get all slugs
		await saveSlugsToLocalSettings()
		Logger.info('MongoDB server status','db.config','',`CONNECTED 🚀`,'v')
	} catch (err) {
		Logger.error('Database','db.config','',err,'ERROR')
	}
}