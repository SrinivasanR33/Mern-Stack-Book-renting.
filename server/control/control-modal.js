const book = require("../modal/modal-book");

GetBooks = async (req, res) => {
  await book.books
    .find({}, (err, books) => {
      if (err) {
        return res
          .status(400)
          .json({ success: false, error: "Book not in the list" });
      }
      if (!books.length) {
        return res
          .status(404)
          .json({ success: false, error: "Page not found" });
      }
      return res.status(200).json({ success: true, data: books });
    })
    .catch((err) => console.log(err));
};
SearchBooks = async (req, res) => {
  const body = req.body;
  await book.books
    .find({ title: { $regex: body.title, $options: "i" } }, (err, books) => {
      if (err) {
        return res
          .status(400)
          .json({ success: false, error: "Book not in the list" });
      }
      if (!books.length) {
        return res
          .status(404)
          .json({ success: false, error: "Page not found" });
      }
      return res.status(200).json({ success: true, data: books });
    })
    .catch((err) => console.log(err));
};
bookinfo = async (req, res) => {
  const body = req.body;
  await book.books
    .find({ _id: body.id }, (err, books) => {
      if (err) {
        return res
          .status(400)
          .json({ success: false, error: "Book not in the list" });
      }
      if (!books.length) {
        return res
          .status(404)
          .json({ success: false, error: "Page not found" });
      }
      return res.status(200).json({ success: true, data: books });
    })
    .catch((err) => console.log(err));
};
creatBook = async (req, res) => {
  const body = req.body;
  const newbody = new book.books(body);
  await newbody
    .save()
    .then((book) => {
      return res.status(201).json({
        success: true,
        data: book,
        message: "Book Created Successfully",
      });
    })
    .catch((err) => {
      if (err) {
        return res
          .status(400)
          .json({ success: false, error: "Book not in the list" });
      }
      if (!books.length) {
        return res
          .status(404)
          .json({ success: false, error: "Page not found" });
      }
      console.log(err);
    });
};
Updatebook = async (req, res) => {
  const body = req.body;
  console.log(body);

  book.books.findOne({ _id: body._id }, (err, doc) => {
    if (err) {
      return res
        .status(400)
        .json({ err, success: false, error: "Book not in the list" });
    }
    if (body) {
      console.log(doc);
      doc.author = body.author;
      doc.title = body.title;
      doc.year = +body.year;
      doc.pages = +body.pages;
      doc.language = body.language;
      doc.country = body.country;
      doc
        .save()
        .then(() => {
          return res.status(201).json({
            success: true,
            data: doc,
            message: "Book Updated Successfully",
          });
        })

        .catch((err) => {
          if (err) {
            return res
              .status(400)
              .json({ err, success: false, error: "Book not in the list" });
          }
        });
    }
  });
};
deleteBook = async (req, res) => {
  const body = req.body;
  console.log(body);
  await book.books
    .findOneAndDelete({ _id: req.params.id }, (err, book) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }

      if (!book) {
        return res
          .status(404)
          .json({ success: false, error: `Book not found` });
      }

      return res
        .status(200)
        .json({ success: true, message: "Deleted Successfully", data: book });
    })
    .catch((err) => console.log(err));
};

module.exports = {
  GetBooks,
  SearchBooks,
  bookinfo,
  Updatebook,
  creatBook,
  deleteBook,
};
