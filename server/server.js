import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'

import { apiRoutes } from './router/routes.js'
import { Logger } from './utils/logger.js'
import { swaggerSpec } from './utils/swagger.js'
import swaggerUi from 'swagger-ui-express'

//Middleware
import errorMiddleware from './middlewares/error-middleware.js'

dotenv.config()
const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI
const DB_NAME = process.env.DB_NAME

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use(errorMiddleware)
// Routes
app.use('/api', apiRoutes)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {explorer: true}))


mongoose.set('strictQuery', true)

// Launch server
const start = async () => {
	try {
		// Connect DB
		await mongoose.connect(`${MONGO_URI}/${DB_NAME}`)
			.then(() => Logger.info('MongoDB server status','','','CONNECTING','v'))
			.catch((err) => Logger.error('DB Error','','',err,''))
		app.listen(PORT, () => {
			Logger.info(`Server started on port:`, `${PORT}`, '','DONE', 'v')
		})
	} catch (err) {
		Logger.error('Server error', '','',err,'SERVER DOWN')
	}
}
start()