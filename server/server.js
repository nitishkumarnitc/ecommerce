const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const order = require("./routes/api/order");
const log=require("./logger");

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => log.info("MongoDB successfully connected"))
  .catch(err => log.error(err));

// Routes
app.use("/api/order", order);

const port = process.env.PORT || 5000;

app.listen(port, () => log.info(`Server up and running on port ${port} !`));
