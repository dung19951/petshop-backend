import { login, register } from "../models/user.js";
export const userLogin = (req, res) => {
  const data = req.body;
  login(data, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const userRegister = (req, res) => {
  const data = req.body;
  register(data, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};
