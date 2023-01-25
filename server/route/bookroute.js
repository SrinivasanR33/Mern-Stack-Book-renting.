const experess = require("express");
const BookUrl = require("../control/control-modal");
const UserUrl = require("../control/user-modal");
const RentUrl = require("../control/rent_modal");
const rounter = experess.Router();

rounter.get("/books", BookUrl.GetBooks);
rounter.post("/books/search", BookUrl.SearchBooks);
rounter.post("/books/info", BookUrl.bookinfo);
rounter.post("/books/add", BookUrl.creatBook);
rounter.put("/books/update", BookUrl.Updatebook);
rounter.delete("/books/delete/:id", BookUrl.deleteBook);

rounter.post("/add/user", UserUrl.createUser);
rounter.get("/user/list", UserUrl.GetUser);
rounter.post("/user/search", UserUrl.searchUser);
rounter.put("/user/remove", UserUrl.deleteUser);
rounter.post("/user/sendmail", UserUrl.SendUser);

rounter.post("/rent/mapping", RentUrl.createRentBook);
rounter.post("/rent/list", RentUrl.GetRentedBooks);

module.exports = rounter;
