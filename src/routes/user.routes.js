import { Router } from "express";
import multer from 'multer';
import { saveUser,
    getAllUsers,
    getUserById,
    changeRoleUser, 
    getUserForChange,
    getUserByEmail,
    goUpDocument,
    uploadDocumentUser,
    getProfile,
    uploadProfileUser,
    deleteUser,
    } from "../controller/user.controller.js";
import { passportCall } from "../utils.js";
import { isAdmin } from "./middlewares.routes.js";
import { uploadProfileImage,uploadDocument } from "../config/multer.config.js";

const router = Router();

// Configuración de Multer para manejar la carga de archivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/",passportCall('jwt'),isAdmin,getAllUsers);
router.post("/",passportCall("jwt"),isAdmin,saveUser);
router.get("/:uid",passportCall("jwt"),isAdmin,getUserById);
router.delete("/:uid",passportCall("jwt"),isAdmin,deleteUser);
router.get("/admin/:uid",passportCall("jwt"),isAdmin,getUserForChange);
router.post("/admin/:uid",passportCall("jwt"),isAdmin,changeRoleUser);
router.get("/byemail/:userEmail",passportCall("jwt"),isAdmin,getUserByEmail);
router.get("/:uid/documents",passportCall("jwt"),goUpDocument);
router.get("/:uid/profile/",passportCall("jwt"),getProfile);
router.post('/:uid/upload-avatar/', passportCall("jwt"),uploadProfileImage.single('profiles'), uploadProfileUser);
router.post("/:uid/upload-documents/",passportCall("jwt"), uploadDocument.single('documents'), uploadDocumentUser); // Usar single para manejar un solo archivo


export default router;