const rent = require("../modal/modal-book");

createRentBook = async (req, res) => {
  const body = req.body;
  const customer = new rent.rentBook(body);
  await customer
    .save()
    .then((use) => {
      return res.status(201).json({
        success: true,
        data: use,
        message: "MappingCreated",
      });
    })
    .catch((err) => {
      if (err) {
        return res
          .status(400)
          .json({ success: false, error: "Mapping not created" });
      }
    });
};
GetRentedBooks = async (req, res) => {
  const body = req.body;
  await rent.rentBook
    .find(body, (err, log) => {
      if (err) {
        return res
          .status(200)
          .json({ success: false, massage: "User not in the list" });
      }
      if (log.length > 0) {
        return res.status(200).json({ success: true, data: log });
      } else {
        return res.status(200).json({ success: false, data: [] });
      }
    })
    .catch((err) => console.log(err));
};
module.exports = { createRentBook, GetRentedBooks };
