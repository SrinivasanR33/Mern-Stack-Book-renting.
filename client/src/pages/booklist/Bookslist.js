import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBook, getAllBooks, SearchBooks } from "../../service/Serivice";

import { AiFillEdit, AiFillDelete } from "react-icons/ai";

import "./bookslist.css";
import { BiEdit } from "react-icons/bi";
function Bookslist() {
  const dispatch = useDispatch();
  const { getBooklist } = useSelector((state) => state.Books);

  useEffect(() => {
    const getBooks = async () => {
      dispatch(getAllBooks());
    };
    getBooks();
  }, []);

  const columns = [
    { dataField: "author", text: "Author Name", sort: true },
    { dataField: "title", text: "Title", sort: true },
    { dataField: "country", text: "Country", sort: true },
    { dataField: "pages", text: "Num Of Pages", sort: true },
    { dataField: "language", text: "Book Language", sort: true },
    { dataField: "year", text: "Published Year", sort: true },
  ];
  const deletedata = async (row) => {
    console.log(row);

    await dispatch(deleteBook(row));
  };
  return (
    <div className="contain">
      <div className="row">
        <div className="col-md-11 p-2">
          <div className="card">
            <div className="card-header">
              <h5>Books List</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table
                  className="table"
                  style={{
                    overflowY: "auto",
                    maxHeight: "300px",
                    display: "block",
                  }}
                >
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th className="text-center" style={{ width: "20%" }}>
                        Author Name
                      </th>
                      <th>Title</th>
                      <th>Country</th>
                      <th className="text-center" style={{ width: "35%" }}>
                        Num Of Pages
                      </th>
                      <th className="text-center" style={{ width: "25%" }}>
                        Book Language
                      </th>
                      <th className="text-center" style={{ width: "40%" }}>
                        Published Year
                      </th>
                      <th className="text-center" style={{ width: "0%" }}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {getBooklist &&
                      getBooklist.length > 0 &&
                      getBooklist.map((val, i) => (
                        <tr>
                          <td>{i + 1}</td>
                          <td>{val.author}</td>
                          <td>{val.title}</td>
                          <td>{val.country}</td>
                          <td>{val.pages}</td>
                          <td>{val.language}</td>
                          <td>{val.year}</td>
                          <td>
                            <AiFillDelete
                              color="red"
                              onClick={() => deletedata(val._id)}
                            />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bookslist;
