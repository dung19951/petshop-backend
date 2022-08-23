import db from "../config/database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = (data, res) => {
  db.query(
    "SELECT * FROM users WHERE email = ? AND is_admin = 1;",
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
  data.password = password;
  db.query("INSERT INTO users SET ?", data, (err, results) => {
    if (err) {
      console.log(err);
      res(err, null);
    } else {
      res(null, results);
    }
  });
};

export const list = (data, res) => {
  var limit = data.limit ? data.limit : 10;
  var currentPage = data.page ? data.page : 1;
  var offset = limit * currentPage - limit;
  var orderBy = data.sortBy ? data.sortBy : "id";
  var sort = data.desc ? "desc" : "asc";
  db.query(
    "SELECT count(*) as numRows FROM users",
    function (err, rows, fields) {
      if (err) {
        res(err, null);
      } else {
        var numRows = rows[0].numRows;
        var numPages = Math.ceil(numRows / limit);
        db.query(
          `SELECT * FROM users ORDER BY ${db.escape(orderBy)} ${db.escape(
            sort
          )} LIMIT ${db.escape(parseInt(limit))} OFFSET ${db.escape(
            parseInt(offset)
          )} `,
          function (err, rows, fields) {
            if (err) {
              res(err, null);
            } else {
              res(null, {data:rows, totalPage:numPages,currentPage:currentPage});
            }
          }
        );
      }
    }
  );
};

const generatePassword = async (password) => {
  return await new Promise((res, rej) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) rej(err);
      res(hash);
    });
  });
};
