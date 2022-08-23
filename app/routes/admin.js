// import express
import express from "express";
import loginValidation from "../validation/validation.js";
import auth from "../middleware/auth.js";

// import function from controller
import { adminLogin, adminRegister, adminList } from "../controllers/admin.js";

// init express router
const router = express.Router();

router.post("/login", loginValidation, adminLogin);
router.post("/register", adminRegister);
router.get("/user-listing",auth, adminList);

export default router;
