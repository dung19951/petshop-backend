// import express
import express from "express";
import loginValidation from "../validation/validation.js";

// import function from controller
import { userLogin, userRegister } from "../controllers/user.js";

// init express router
const router = express.Router();

router.post("/login", loginValidation, userLogin);

router.post("/register", userRegister);

export default router;
