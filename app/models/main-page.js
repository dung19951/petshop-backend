import db from "../config/database.js";

export const promotions = (data, res) => {
  var limit = data.limit ? data.limit : 10;
  var currentPage = data.page ? data.page : 1;
  var offset = limit * currentPage - limit;
  var orderBy = data.sortBy ? data.sortBy : "id";
  var sort = data.desc ? "desc" : "asc";
  db.query(
    "SELECT count(*) as numRows FROM promotions",
    function (err, rows, fields) {
      if (err) {
        res(err, null);
      } else {
        var numRows = rows[0].numRows;
        var numPages = Math.ceil(numRows / limit);
        db.query(
          `SELECT * FROM promotions ORDER BY ${db.escape(orderBy)} ${db.escape(
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

export const blogs = (data, res) => {
  var limit = data.limit ? data.limit : 10;
  var currentPage = data.page ? data.page : 1;
  var offset = limit * currentPage - limit;
  var orderBy = data.sortBy ? data.sortBy : "id";
  var sort = data.desc ? "desc" : "asc";
  db.query(
    "SELECT count(*) as numRows FROM posts",
    function (err, rows, fields) {
      if (err) {
        res(err, null);
      } else {
        var numRows = rows[0].numRows;
        var numPages = Math.ceil(numRows / limit);
        db.query(
          `SELECT * FROM posts ORDER BY ${db.escape(orderBy)} ${db.escape(
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

export const blog = (data, res) => {
  db.query(
    "SELECT * FROM posts WHERE id = ?",
    data.params.id,
    (err, result) => {
      if (err) {
        res(err, null);
      } else {
        res(null, result);
      }
    }
  );
};
