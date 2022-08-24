import createError from "http-errors";
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import indexRouter from "./app/routes/user.js";
import adminRouter from "./app/routes/admin.js";
import mainRouter from "./app/routes/main-page.js";

const app = express();

app.use(express.json());

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());

app.use("/api/user", indexRouter);
app.use("/api/admin", adminRouter);
app.use("/api/main", mainRouter);

// Handling Errors
app.use((err, req, res, next) => {
  // console.log(err);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    message: err.message,
  });
});

app.listen(3000, () => console.log("Server is running on port 3000"));
