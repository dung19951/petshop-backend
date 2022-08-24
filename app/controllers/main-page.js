import { promotions, blogs, blog } from "../models/main-page.js";
export const promotionsController = (req, res) => {
  promotions(req.body, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const blogsController = (req, res) => {
  blogs(req.body, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const blogController = (req, res) => {
  blog(req, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};
