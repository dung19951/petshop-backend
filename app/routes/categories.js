// import express
import express from "express";
import auth from "../middleware/auth.js";

// import function from controller
import {
  all,
  detail,
  create,
  edit,
  destroy,
} from "../controllers/categories.js";

// init express router
const router = express.Router();

router.get("/", all);
router.get("/:id", detail);
router.post("/create", create);
router.put("/:id", edit);
router.delete("/:id", destroy);

export default router;
