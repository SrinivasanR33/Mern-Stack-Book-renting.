import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BookInfo,
  loadingPage,
  SearchBooks,
  UpdateBook,
} from "../../service/Serivice";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import "./search.css";

function SearchBook() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState({
    _id: "",
    author: "",
    title: "",
    year: 0,
    pages: 0,
    language: "",
    country: "",
  });
  const { bookSearch, bookdetails } = useSelector((state) => state.Books);
  const handelChange = async (e) => {
    if (e.length > 3) {
      dispatch(SearchBooks({ title: e }));
    }
    if (!e) {
      dispatch({
        type: "GET_SEARCH_BOOK",
        payload: [],
      });
    }
  };
  const handelId = (e) => {
    dispatch(BookInfo({ id: e._id }));
    setInputValue({
      _id: e._id,
      author: e.author,
      title: e.title,
      year: e.year,
      pages: e.pages,
      language: e.language,
      country: e.country,
    });
    setShow(true);
  };
  useEffect(() => {
    return () => {
      dispatch({
        type: "GET_SEARCH_BOOK",
        payload: [],
      });
    };
  }, []);
  // useEffect(() => {
  //   if (bookdetails) {
  //     dispatch(loadingPage(true));
  //     setInputValue({
  //       author: bookdetails[0]?.author,
  //       title: bookdetails[0]?.title,
  //       year: bookdetails[0]?.year,
  //       pages: bookdetails[0]?.pages,
  //       language: bookdetails[0]?.language,
  //       country: bookdetails[0]?.country,
  //     });
  //     dispatch(loadingPage(false));
  //   }
  // }, [bookdetails]);
  const editValue = (row) => {
    console.log(row);
  };
  const deletedata = (row) => {
    console.log(row);
  };
  const Submit = async () => {
    const data = {
      _id: inputValue._id,
      author: inputValue.author,
      title: inputValue.title,
      year: +inputValue.year,
      pages: +inputValue.pages,
      language: inputValue.language,
      country: inputValue.country,
    };
    await dispatch(UpdateBook(data));
    setInputValue({
      author: "",
      title: "",
      year: 0,
      pages: 0,
      language: "",
      country: "",
    });
    setShow(false);
    dispatch({
      type: "GET_SEARCH_BOOK",
      payload: [],
    });
  };
  return (
    <div className="pt-4">
      {!show ? (
        <div className="card">
          <div className="card-header">Search Books</div>
          <div className="card-body">
            <div className="row">
              <div className="col-sm-6">
                <div className="d-flex flex-column">
                  <label className="searchlable">Search Book Title</label>
                  <input
                    type={"text"}
                    className="searchfield"
                    placeholder="Search"
                    onChange={(e) => handelChange(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="mapbody">
              {bookSearch &&
                bookSearch.length > 0 &&
                bookSearch.map((val) => (
                  <div className="solo">
                    <div className="info" onClick={() => handelId(val)}>
                      <div>{val.title}</div>
                      <div>{val.author}</div>
                      <div>{val.pages}</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="card-header">Book Details</div>
          <div className="card-body">
            <div className="row">
              <div className="col-sm-4">
                <label className="label">Author</label>
                <input
                  className="form-control"
                  placeholder="Author"
                  type={"text"}
                  value={inputValue.author}
                  onChange={(e) => {
                    setInputValue({ ...inputValue, author: e.target.value });
                  }}
                />
              </div>
              <div className="col-sm-4">
                <label className="label">Title</label>
                <input
                  className="form-control"
                  placeholder="Title"
                  type={"text"}
                  value={inputValue.title}
                  onChange={(e) => {
                    setInputValue({ ...inputValue, title: e.target.value });
                  }}
                />
              </div>
              <div className="col-sm-4">
                <label className="label">Language</label>
                <input
                  className="form-control"
                  placeholder="Language"
                  type={"text"}
                  value={inputValue.language}
                  onChange={(e) => {
                    setInputValue({ ...inputValue, language: e.target.value });
                  }}
                />
              </div>
              <div className="col-sm-4">
                <label className="label">Country</label>
                <input
                  className="form-control"
                  placeholder="Country"
                  type={"text"}
                  value={inputValue.country}
                  onChange={(e) => {
                    setInputValue({ ...inputValue, country: e.target.value });
                  }}
                />
              </div>
              <div className="col-sm-4">
                <label className="label">Year</label>
                <input
                  className="form-control"
                  placeholder="Year"
                  type={"number"}
                  value={inputValue.year}
                  onChange={(e) => {
                    setInputValue({ ...inputValue, year: e.target.value });
                  }}
                />
              </div>
              <div className="col-sm-4">
                <label className="label">Pages</label>
                <input
                  className="form-control"
                  placeholder="Pages"
                  type={"number"}
                  value={inputValue.pages}
                  onChange={(e) => {
                    setInputValue({ ...inputValue, pages: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="d-flex pt-3">
              <button className="btn btn-primary btn-sm" onClick={Submit}>
                Submit
              </button>
            </div>
          </div>
          <div className="card-footer">
            <div className="itembt">
              <button className="btn btn-dark" onClick={() => setShow(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBook;
