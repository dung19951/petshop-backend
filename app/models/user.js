import db from "../config/database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from 'mongoose';

export const login = (data, req, res) => {
  db.query(
    "SELECT * FROM users WHERE email = ?;",
    data.email,
    (err, result) => {
      if (result.length == 0) {
        res(null, "email  not found");
      }
      req.session.user = result[0]
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
    },
  );
  
};

export const register = async (data, res) => {
  const password = await generatePassword(data.password);
  db.query("SELECT * FROM users WHERE email = ?;", data.email,(err, result) => {
    let newUserInfo = result;
    if (result.length >= 1) {
      res(null, "email exist");
      return;
    }
    let newUser = {
      first_name: data.first_name,
      email: data.email,
      password: password
    };
    db.query("INSERT INTO users SET ?", newUser, (err, results) => {
      if (err) {
        console.log(err);
        res(err, "cant insert");
      } else {
        res(null, "success");
      }
    });
  })     
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
              res(null, {
                data: rows,
                totalPage: numPages,
                currentPage: currentPage,
              });
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


export const editUser = (req, res) => {
  db.query("UPDATE users SET ? WHERE id = ?;",
    [req.body, req.params.id], 
    (err, result) => {
      if (err) {
        res(err, "cant update user");
      } 
      else {
        res(null, "update success");
      }
    }
  )
};

export const deleteUser = (req, res) => {
  db.query("DELETE FROM users WHERE id = ?;", req.params.id, 
    (err, result) => {
      if (err) {
        res(err, "cant delete user");
      } 
      else {
        res(null, "delete success");
      }
    }
  )
};

export const logout = (req, res, callback) => {
  var sess = req.session.user;
  if(sess){
      req.session.user = null;
      return callback(null, {'success': true, "message": "user logout successfully"});
  }
  callback(null, {'success': true, "message": "user logout successfully"});
};