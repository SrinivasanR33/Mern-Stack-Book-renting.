const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://srinivasan:rs2ssvvmm@cluster0.klvd629.mongodb.net/mernStack",
    { useNewUrlParser: true }
  )
  .then((e) => {
    console.log("Db Connected Successfully");
  })
  .catch((e) => {
    console.error("Connection error", e.message);
  });

const db = mongoose.connection;

module.exports = db;
