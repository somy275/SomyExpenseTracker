import { Router } from "express";
import { Protect } from "../middlewares/VerifyAuthMiddleWare.js";
import { addUserExpenses, deleteUserExpenses, editUserExpenses, getUserExpenses } from "../controllers/expenseController.js";
const router = Router();
router.post("/getExpense", Protect, getUserExpenses)
router.post("/addExpense", Protect, addUserExpenses)
router.put("/editExpense", Protect, editUserExpenses)
router.delete("/deleteExpense/:id", Protect, deleteUserExpenses)
export const expenseRoutes = router;