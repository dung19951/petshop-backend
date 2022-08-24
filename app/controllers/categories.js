import { index, show, store, update, remove } from "../models/categories.js";
export const all = (req, res) => {
  index(req.body, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const detail = (req, res) => {
  show(req, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const create = (req, res) => {
  store(req.body, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const edit = (req, res) => {
  update(req, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const destroy = (req, res) => {
  remove(req, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};
