import { userRouter } from './userRouter.js'
import express from 'express'

const routes = express.Router()

routes.use('/user', userRouter)
// routes.use('/role', roleRouter)


export const apiRoutes = routes