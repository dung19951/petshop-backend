import { login, register } from "../models/admin.js";
export const adminLogin = (req, res) => {
  const data = req.body;
  login(data, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const adminRegister = (req, res) => {
  const data = req.body;
  register(data, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};
