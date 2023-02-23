const HttpError = require("../models/http-error");
const UserModel = require("../models/UserModel");
const express = require("express");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");
const AdminModel = require("../models/admin");
const signup = async (req, res, next) => {
  // const errors = validationResult(req);
  console.log(req.body);
  const { name, email, password, mobile } = req.body;
  // console.log(req.body)
  let existingEmail;
  let existingMobile;
  try {
    existingEmail = await UserModel.findOne({ email: email });
    //   existingMobile = await UserModel.findOne({ mobilenumber:mobile});
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  if (existingEmail || existingMobile) {
    const error = new HttpError(
      "User exists already, please login instead.",
      422
    );
    return next(error);
  }

  const createdUser = new UserModel({
    name: name,
    email: email,
    password: password,
    mobilenumber: mobile,
  });
  console.log(createdUser, "hjghjg");
  try {
    await createdUser.save();
    // console.log(newuser, "no new user error");
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  // console.log(req.body)
  // const errors = validationResult(req)

  let existingUser;
  try {
    existingUser = await UserModel.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Login failed, check your crednetials or signup.",
      500
    );
    return next(error);
  }
  // console.log(existingUser)
  if (!existingUser) {
    // console.log(password,existingUser.password)
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );

    return next(error);
  } else {
    const pass = await bcrypt.compare(password, existingUser.password);
    // console.log(pass)
    if (!pass) {
      const error = new HttpError(
        "Invalid credentials, could not log you in.",
        401
      );
      return next(error);
    }
  }

  res.json({ user: existingUser.toObject({ getters: true }) });
};

const adminlogin = async (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;
  const user = await AdminModel.find({ email, password });
  if (!user) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );

    return next(error);
  }
  res.json(user);
};

const getusers = async (req, res, next) => {
  const user = await UserModel.find({});
  res.json(user);
};

const deleteusers = async (req, res) => {
  console.log(req.body);
  const { email } = req.body;
  const us = await UserModel.find({ email });
  console.log(us);
  const delmod = await UserModel.deleteOne({
    email: email,
  });
  console.log(delmod);
  res.json(delmod);
};

exports.signup = signup;
exports.login = login;
exports.adminlogin = adminlogin;
exports.getusers = getusers;
exports.deleteusers = deleteusers;
