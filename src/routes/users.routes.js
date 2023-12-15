import { Router } from "express";
import * as userController  from "../controllers/user.controller";
import { verifyToken, isAdmin } from "../middlewares";

const router = Router();

router.get('/', [verifyToken, isAdmin] ,userController.get_users)
router.get('/:userId', [verifyToken],userController.get_user_by_id)
router.post('/', [verifyToken],userController.store_user)
router.put('/:userId', [verifyToken],userController.update_user)
router.delete('/:userId', [verifyToken, isAdmin], userController.delete_user)

export default router;