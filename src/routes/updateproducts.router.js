import { Router } from "express";
import { passportCall} from "../utils.js";
import { uploadProductImage } from "../config/multer.config.js";
import { getAllProductsForAdmin,createProduct,deleteProduct,updateProduct,getProductByIdForAdmin,uploadImageProduct} from "../controller/product.controller.js";


const router = Router();

router.get("/",passportCall('jwt') ,getAllProductsForAdmin);
router.post ("/",passportCall('jwt') , createProduct);
router.delete("/:pid",passportCall('jwt') ,deleteProduct);
router.get ("/:pid",passportCall('jwt') ,getProductByIdForAdmin);
router.put("/:pid",passportCall('jwt') , updateProduct);
router.post('/:pid', uploadProductImage.single('products'), uploadImageProduct);


export default router;