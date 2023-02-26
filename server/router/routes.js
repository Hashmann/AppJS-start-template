import express from 'express'
import { testRouter } from './test.router.js'
import { userRouter } from './user.router.js'
import { roleRouter } from './role.router.js'
import { permissionRouter } from './permission.router.js'
import { postRouter } from './post.router.js'
import authMiddleware from '../middlewares/auth.middleware.js'
import permissionsMiddleware from '../middlewares/permissions.middleware.js'

const routes = express.Router()

routes.use('/test', testRouter)
routes.use('/user', userRouter)
routes.use('/role', authMiddleware, roleRouter)
routes.use('/permission', authMiddleware, permissionRouter)
routes.use('/post', postRouter)

export const apiRoutes = routes

/**
 * @swagger
 * tags:
 *  name: User
 *  description: Managing API
 * */

/**
 * @swagger
 * tags:
 *  name: Role
 *  description: Managing API
 * */

/**
 * @swagger
 * tags:
 *  name: Permission
 *  description: Managing API
 * */

/**
 * @swagger
 * tags:
 *  name: Post
 *  description: Managing API
 * */

/**
 * @swagger
 * tags:
 *  name: Test
 *  description: Requests
 * */