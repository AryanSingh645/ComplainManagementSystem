import {Router} from "express"
import { changeStatus, getAdminDashBoard, loginAdmin, logoutAdmin, pingAdmins, registerAdmin, verifyAdmin } from "../controller/admin.controller.js";
import verifyUser from "../middleware/auth.middleware.js";

const router = Router();
router.route(`/signup/${process.env.JWT_SECRET}`).post(registerAdmin);
router.route(`/login`).post(loginAdmin);
router.route(`/verify`).get(verifyUser,verifyAdmin);
router.route('/logout').get(verifyUser, logoutAdmin);
router.route('/getDashboardData').get(verifyUser, getAdminDashBoard);
router.route('/updateStatus').post(verifyUser, changeStatus);
router.route('/pingAdmins').post(verifyUser, pingAdmins);

export default router;