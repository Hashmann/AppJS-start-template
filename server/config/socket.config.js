import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { Logger } from '../utils/logger.utils.js'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, { /* options */ })

io.on("connection", (socket) => {
	// ...
	Logger.info('Socket status','','','CONNECTING','v')
})

export {
	app,
	httpServer
}

