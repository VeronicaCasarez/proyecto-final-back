import { Router } from "express";
import { __dirname } from "../utils.js";
import { passportCall} from "../utils.js";
import { getAllProducts,getProductById} from "../controller/product.controller.js";

const router = Router();

router.get("/", passportCall('jwt') ,getAllProducts);
router.get("/:pid",passportCall('jwt') ,getProductById);


export default router;
