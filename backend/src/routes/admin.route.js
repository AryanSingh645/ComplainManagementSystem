import {Router} from "express"
import { loginAdmin, logoutAdmin, registerAdmin } from "../controller/admin.controller.js";
import verifyUser from "../middleware/auth.middleware.js";

const router = Router();
router.route(`/signup/${process.env.JWT_SECRET}`).post(registerAdmin);
router.route(`/login`).post(loginAdmin);
router.route('/logout').get(verifyUser, logoutAdmin);

export default router;