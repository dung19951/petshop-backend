import db from "../config/database.js";
import slugify from "slugify";
const options = {
  replacement: "-",
  remove: undefined,
  lower: true,
  strict: false,
  locale: "en",
  trim: true,
};
export const index = (data, res) => {
  var limit = data.limit ? data.limit : 10;
  var currentPage = data.page ? data.page : 1;
  var offset = limit * currentPage - limit;
  var orderBy = data.sortBy ? data.sortBy : "id";
  var sort = data.desc ? "desc" : "asc";
  db.query(
    "SELECT count(*) as numRows FROM brands",
    function (err, rows, fields) {
      if (err) {
        res(err, null);
      } else {
        var numRows = rows[0].numRows;
        var numPages = Math.ceil(numRows / limit);
        db.query(
          `SELECT * FROM brands ORDER BY ${db.escape(orderBy)} ${db.escape(
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

export const show = (data, res) => {
  db.query(
    "SELECT * FROM brands WHERE id = ?",
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

export const store = (data, res) => {
  data.slug = slugify(data.title, options);
  db.query("INSERT INTO brands SET ?", data, (err, results) => {
    if (err) {
      console.log(err);
      res(err, null);
    } else {
      res(null, results);
    }
  });
};

export const update = (data, res) => {
  db.query(
    `UPDATE  brands SET ? WHERE id= ?`,
    [data.body, data.params.id],
    (err, results) => {
      if (err) {
        console.log(err);
        res(err, null);
      } else {
        res(null, results);
      }
    }
  );
};

export const remove = (data, res) => {
  db.query(`DELETE FROM brands WHERE  id= ?`, data.params.id, (err, results) => {
    if (err) {
      console.log(err);
      res(err, null);
    } else {
      res(null, results);
    }
  });
};
