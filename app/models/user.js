import db from "../config/database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = (data, res) => {
  db.query(
    "SELECT * FROM users WHERE email = ?;",
    data.email,
    (err, result) => {
      if (result.length == 0) {
        res(null, "email  not found");
      }
      bcrypt.compare(data.password, result[0].password, (bErr, bResult) => {
        if (bErr) {
          res(null, "Email is incorrect!");
        }
        if (bResult) {
          const token = jwt.sign(
            { id: result[0].id },
            "the-super-strong-secrect",
            { expiresIn: "1h" }
          );
          res({ token: token, user: result[0] });
        }
      });
    }
  );
};

export const register = async (data, res) => {
  const password = await generatePassword(data.password);
  let user = {
    name: data.name,
    email: data.email,
    password: password,
  };
  db.query("INSERT INTO users SET ?", user, (err, results) => {
    if (err) {
      console.log(err);
      res(err, null);
    } else {
      res(null, results);
    }
  });
};

const generatePassword = async (password) => {
  return await new Promise((res, rej) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) rej(err);
      res(hash);
    });
  });
};
