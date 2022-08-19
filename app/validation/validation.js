import { check }  from "express-validator";
var loginValidation = [
  check("email", "Please include a valid email")
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: true }),
  check("password", "Password must be 6 or more characters").isLength({
    min: 6,
  }),
];

export default loginValidation;