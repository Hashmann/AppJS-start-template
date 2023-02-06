import Router from 'express'
import { userController } from '../controllers/user-controller.js'
// import {registerValidation, loginValidation} from '../validations/userValidation.js'
import handleValidationErrors from '../middlewares/handleValidationErrors.js'
// import checkAuth from "../middlewares/checkAuth.js";
const router = new Router()

// router.post('/register', registerValidation, handleValidationErrors, authController.register)
router.post('/register', userController.register)

// router.post('/login', loginValidation, handleValidationErrors, authController.login)
// router.post('/logout', authController.logout)
router.get('/activate/:link', userController.activate)
// router.get('/refresh', authController.refresh)


// router.get('/me', checkAuth, authController.getMe)

router.get('/test', userController.getUsers)

export const userRouter = router