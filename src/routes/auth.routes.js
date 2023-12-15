import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { verifyToken } from "../middlewares";

const router = Router();

router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/verify', [verifyToken], authController.verifyToken)

export default router;