import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'

import { apiRoutes } from './router/routes.js'
import { Logger } from './utils/logger.utils.js'
import { swaggerSpec } from './utils/swagger.utils.js'
import swaggerUi from 'swagger-ui-express'

import errorMiddleware from './middlewares/error.middleware.js'

dotenv.config({ path: `.env${process.env.NODE_ENV}` })
const PORT = process.env.PORT || 5000
const MONGO_HOST = process.env.MONGO_DB_HOST
const MONGO_NAME = process.env.MONGO_DB_NAME
mongoose.set('strictQuery', true)

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())

// Routes
app.use('/api', apiRoutes)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {explorer: true}))

//Middlewares
app.use(errorMiddleware)
// Launch server
const start = async () => {
	try {
		// Connect DB
		await mongoose.connect(`${MONGO_HOST}/${MONGO_NAME}`)
			.then(() => Logger.info('MongoDB server status','','','CONNECTING','v'))
			.catch((err) => Logger.error('DB Error','','',err,''))
		app.listen(PORT, () => {
			Logger.info(`Server started on port:`, `${PORT}`, `${process.env.MODE}`,'DONE', 'v')
		})
	} catch (err) {
		Logger.error('Server error', '','',err,'SERVER DOWN')
	}
}
start()