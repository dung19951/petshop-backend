// import express
import express from "express";
import loginValidation from "../validation/validation.js";
import auth from "../middleware/auth.js";

// import function from controller
import { adminLogin, adminRegister, adminList,adminEdit ,adminDelete} from "../controllers/admin.js";

// init express router
const router = express.Router();

router.post("/login", loginValidation, adminLogin);
router.post("/register", adminRegister);
router.get("/user-listing",auth, adminList);
router.put("/user-edit/:id",adminEdit);
router.delete("/user-delete/:id",adminDelete);

export default router;
