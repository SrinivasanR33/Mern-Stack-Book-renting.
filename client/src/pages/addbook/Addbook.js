import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { CreateBook } from "../../service/Serivice";

function Addbook() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState({
    author: "",
    title: "",
    year: 0,
    pages: 0,
    language: "",
    country: "",
  });
  const Submit = async () => {
    const data = {
      author: inputValue.author,
      title: inputValue.title,
      year: +inputValue.year,
      pages: +inputValue.pages,
      language: inputValue.language,
      country: inputValue.country,
    };
    await dispatch(CreateBook(data));
    setInputValue({
      author: "",
      title: "",
      year: 0,
      pages: 0,
      language: "",
      country: "",
    });
  };
  return (
    <div className="pt-4">
      <div className="card">
        <div className="card-header">Add Books</div>
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
      </div>
    </div>
  );
}

export default Addbook;
