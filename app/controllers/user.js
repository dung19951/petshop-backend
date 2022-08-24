
import { login, register, logout, list, deleteUser, editUser } from "../models/user.js";

export const userLogin = (req, res) => {
  const data = req.body;
  login(data, req, (err, results) => {
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

export const userList = (req, res) => {
  list(req.body, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const destroyUser = (req, res) => {
  deleteUser(req, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const userEdit = (req, res) => {
  editUser(req, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};


export const userLogout = (req, res) => {
  logout(req, res, function(err, data) {
    if (err) {
      res.json({ 'error': data.error, 'message': data.message });
    } else {
      res.json({ 'success': data.success, 'message': data.message });
    }
  });
};
