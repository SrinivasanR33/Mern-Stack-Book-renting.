const mongoose = require("mongoose");
// const { customAlphabet } = require("nanoid");
// const alphabet = "123456789";
// const nanoid = customAlphabet(alphabet, 19);
const Schema = mongoose.Schema;
mongoose.set("strictQuery", true);
const User = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "user", required: true },
  },
  { strict: true }
);
const UserRentingBook = new Schema({
  userInfo: { type: Object, required: true },
  bookData: { type: Array, required: true },
  returnDate: { type: String, required: true },
  // rentMapId: { type: String, default: () => nanoid(), required: true },
});
const Books = new Schema({
  author: { type: String, required: true },
  title: { type: String, required: true },
  country: { type: String, require: true },
  language: { type: String, required: true },
  pages: { type: Number, required: true },
  year: { type: Number, required: true },
});
var userlog = mongoose.model("userlogin", User);
var books = mongoose.model("books", Books);
var rentBook = mongoose.model("rent", UserRentingBook);
module.exports = {
  userlog,
  books,
  rentBook,
};
