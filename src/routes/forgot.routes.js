import { Router } from "express";
import {forgotPassword} from "../controller/session.controller.js"

const router = Router();

router.get("", forgotPassword); 

export default router;