import {Router} from "express"
import {registerComplain} from "../controller/complain.controller.js"
import { upload } from "../middleware/multer.middleware.js";

const router = Router();
router.route('/registerComplain').post(upload.fields([
    {name: "gallery"}
]) 
    ,registerComplain);

export default router;