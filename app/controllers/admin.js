import { login, register,list } from "../models/admin.js";
export const adminLogin = (req, res) => {
  login(req.body, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const adminRegister = (req, res) => {
  register(req.body, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const adminList = (req, res) => {
  list(req.body, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};
