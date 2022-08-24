// import express
import express from "express";
import loginValidation from "../validation/validation.js";

// import function from controller
import { userLogin, userRegister, userLogout, userList, destroyUser, userEdit } from "../controllers/user.js";
import { editUser } from "../models/user.js";

// init express router
const router = express.Router();

router.post("/login", loginValidation, userLogin);

router.post("/register", userRegister);
router.get("/list-user", userList);
router.delete("/delete/:id", destroyUser);
router.put("/edit/:id", userEdit);
router.post("/logout", userLogout);

export default router;
