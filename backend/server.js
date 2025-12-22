// require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const HttpError = require("./models/http-error");
const userRoutes = require("./routes/user");
const portRoutes = require("./routes/portfolio");
const transRoutes = require("./routes/transactions");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
}); //cors error

app.use("/users", userRoutes);
app.use("/port", portRoutes);
app.use("/trans", transRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});


const dbUrl ="mongodb://saisrikarreddyk20:srikar7382@ac-vnld57x-shard-00-00.hxkqmok.mongodb.net:27017,ac-vnld57x-shard-00-01.hxkqmok.mongodb.net:27017,ac-vnld57x-shard-00-02.hxkqmok.mongodb.net:27017/?ssl=true&replicaSet=atlas-vnqso4-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5011);
  })
  .catch((err) => {
    console.log(err);
  });
