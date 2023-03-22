import express from 'express'
import { testRouter } from './test.router.js'
import { userRouter } from './user.router.js'
import { roleRouter } from './role.router.js'
import { permissionRouter } from './permission.router.js'
import { postRouter } from './post.router.js'
import { tagRouter } from './tag.router.js'
import { categoryRouter } from './category.router.js'
import { commentRouter } from './comment.router.js'
import { settingsRouter } from './settings.router.js'
// import { statsRouter } from './stats.router.js'
// import { banRouter } from './ban.router.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const routes = express.Router()

routes.use('/test', testRouter)
routes.use('/user', userRouter)
routes.use('/post', postRouter)
routes.use('/permission', permissionRouter) // authMiddleware,
routes.use('/role', roleRouter) // authMiddleware,
routes.use('/tag', tagRouter) // authMiddleware,
routes.use('/category', categoryRouter)  //  authMiddleware,
routes.use('/comment', commentRouter)
routes.use('/settings', settingsRouter)
// routes.use('/ban', authMiddleware, banRouter)

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

/**
 * @swagger
 * tags:
 *  name: Tag
 *  description: Managing API
 * */

/**
 * @swagger
 * tags:
 *  name: Category
 *  description: Managing API
 * */

/**
 * @swagger
 * tags:
 *  name: Ban
 *  description: Managing API
 * */

/**
 * @swagger
 * tags:
 *  name: Statistics
 *  description: Managing API
 * */

/**
 * @swagger
 * tags:
 *  name: Settings
 *  description: Managing API
 * */

/**
 * @swagger
 * tags:
 *  name: Message
 *  description: Managing API
 * */

/**
 * @swagger
 * tags:
 *  name: Comment
 *  description: Managing API
 * */