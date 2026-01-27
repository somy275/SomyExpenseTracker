import { Router } from "express";
import { GetCountries, GetCurrencyInfo, SetCurrencyInfo } from "../controllers/settingsController.js";
import { Protect } from "../middlewares/VerifyAuthMiddleWare.js";

const router = Router()
router.get('/countries', GetCountries)
router.route('/currency_info').post(Protect, SetCurrencyInfo).get(Protect,GetCurrencyInfo)
export const settingRoutes = router