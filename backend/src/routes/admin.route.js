import {Router} from "express"
import { getAdminDashBoard, loginAdmin, logoutAdmin, registerAdmin, verifyAdmin } from "../controller/admin.controller.js";
import verifyUser from "../middleware/auth.middleware.js";

const router = Router();
router.route(`/signup/${process.env.JWT_SECRET}`).post(registerAdmin);
router.route(`/login`).post(loginAdmin);
router.route(`/verify`).get(verifyAdmin);
router.route('/logout').get(verifyUser, logoutAdmin);
router.route('/getDashboardData').get(verifyUser, getAdminDashBoard);

export default router;