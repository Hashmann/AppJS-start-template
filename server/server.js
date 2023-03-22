import express from 'express'
import { app, httpServer } from './config/socket.config.js'
import { dbConnect } from './config/db.config.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import * as dotenv from 'dotenv'

import { Logger } from './utils/logger.utils.js'
import { apiRoutes } from './router/routes.js'
import { swaggerSpec } from './utils/swagger.utils.js'
import swaggerUi from 'swagger-ui-express'

import errorMiddleware from './middlewares/error.middleware.js'
import settingsMiddleware from './middlewares/settings.middleware.js'

dotenv.config({ path: `.env${process.env.NODE_ENV}` })
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {explorer: true}))
// Settings middleware
app.use(settingsMiddleware)
// Routes
app.use('/api', apiRoutes)

//Error middleware
app.use(errorMiddleware)
// Launch server
const start = async () => {
	try {
		// Connect to DB
		await dbConnect()
		// Start the server
		httpServer.listen(PORT, () => {
			Logger.info(`Server started on port:`, `${PORT}`, `${process.env.MODE}`,'LAUNCHED 🚀', 'v')
		})
	} catch (err) {
		Logger.error('Server error', 'server.js','',err,'SERVER DOWN')
	}
}
await start()