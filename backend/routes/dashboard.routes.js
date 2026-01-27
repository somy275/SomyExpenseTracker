import { Router } from "express"
import { getDashBoardData } from "../controllers/dashboardController.js";
import { Protect } from "../middlewares/VerifyAuthMiddleWare.js";
const router = Router();
router.post("/getDashBoard",Protect, getDashBoardData)
export const dashboardRoutes = router;