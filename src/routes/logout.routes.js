import { Router } from "express";
import {  passportCall } from "../utils.js";
import { logoutSession} from "../controller/session.controller.js"

const router = Router();

// Ruta de cierre de sesión
router.get("/",passportCall('jwt'),logoutSession);


export default router;