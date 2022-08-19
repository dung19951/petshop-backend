// import express
import express from "express";
import loginValidation from "../validation/validation.js";

// import function from controller
import { adminLogin, adminRegister } from "../controllers/admin.js";

// init express router
const router = express.Router();

router.post("/login", loginValidation, adminLogin);

router.post("/register", adminRegister);

export default router;
