import { userRouter } from './user.router.js'
import express from 'express'

const routes = express.Router()

routes.use('/user', userRouter)
// routes.use('/role', roleRouter)


export const apiRoutes = routes


/**
 * @swagger
 * tags:
 *  name: User
 *  description: The users managing API
 * */

/**
 * @swagger
 * tags:
 *  name: Tokens
 *  description: The tokens managing API
 * */