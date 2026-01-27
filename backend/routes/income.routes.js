import { Router } from "express";
import { Protect } from "../middlewares/VerifyAuthMiddleWare.js";
import { addUserIncome, deleteUserIncome, editUserIncome, getUserIncome } from "../controllers/incomeControllers.js";
const router = Router();
router.post("/getIncome", Protect, getUserIncome);
router.post("/addIncome", Protect, addUserIncome);
router.put("/editIncome", Protect, editUserIncome);
router.delete("/deleteIncome/:id", Protect, deleteUserIncome);
export const incomeRoutes = router;