import Router from 'express'
import { permissionController } from '../controllers/permission.controller.js'
import permissionsMiddleware from '../middlewares/permissions.middleware.js'

const router = new Router()

router.get('/', permissionController.getAllPermissions) // permissionsMiddleware(['can-all', 'can-all-perm', 'perms-read']),
/**
 * @swagger
 * /api/permission:
 *   get:
 *     summary: Get all permissions.
 *     tags: [Permission]
 *     description: Get all permissions.
 *     responses:
 *       200:
 *         description: All permissions received.
 *
 */

router.get('/:id', permissionController.getPermission) // permissionsMiddleware(['can-all', 'can-all-perm', 'perm-read']),
/**
 * @swagger
 * /api/permission/{id}:
 *   get:
 *     summary: Get permission by ID.
 *     tags: [Permission]
 *     description: Get permission by ID.
 *     responses:
 *       200:
 *         description: Permission received.
 *
 */

export const permissionRouter = router