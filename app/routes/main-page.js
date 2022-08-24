// import express
import express from "express";
import auth from "../middleware/auth.js";

// import function from controller
import { promotionsController, blogsController, blogController } from "../controllers/main-page.js";

// init express router
const router = express.Router();

router.get("/promotions", promotionsController);
router.get("/blog", blogsController);
router.get("/blog/:id", blogController);

export default router;
