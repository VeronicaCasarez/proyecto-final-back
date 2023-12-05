import { Router } from "express";
import {signup} from "../controller/session.controller.js";

const router = Router();

router.get("", signup);


export default router;