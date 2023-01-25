import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {
  bookRenting,
  findtheUser,
  getAllBooks,
  getUser,
} from "../../service/Serivice";

function UserRentBook() {
  const [bookData, setBooksData] = useState([]);
  const [rentData, setRentDate] = useState(new Date());
  const [selectedUser, setSelectedUser] = useState({});

  const animatedComponents = makeAnimated();
  const dispatch = useDispatch();
  const { getBooklist, userList } = useSelector((state) => state.Books);

  useEffect(() => {
    const getBooks = async () => {
      dispatch(getAllBooks());
      dispatch(getUser());
    };
    getBooks();
  }, []);
  const stycheck = {
    fontSize: "13px",
  };
  const handelChangeUuserSelect = (e) => {
    if (e) {
      setSelectedUser(e);
    } else {
      setSelectedUser("");
    }
  };
  const handelTeamMember = (e) => {
    if (e) {
      setBooksData(e.map((val) => val));
    } else {
      setBooksData([]);
    }
  };
  const mappingData = async () => {
    const dataplayload = {
      userInfo: selectedUser,
      bookData: bookData,
      returnDate: rentData,
    };
    await dispatch(bookRenting(dataplayload));
  };
  return (
    <div className="contain">
      <div className="row">
        <div className="col-sm-11">
          <div className="card">
            <div className="card-header">
              <h5>Book Renting</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-sm-4">
                  <Select
                    options={userList}
                    components={animatedComponents}
                    getOptionLabel={(options) => options.name}
                    getOptionValue={(options) => options}
                    value={userList.filter((la) => la === selectedUser)}
                    isClearable
                    isSearchable
                    theme={(theme) => ({
                      ...theme,
                      colors: {
                        ...theme.colors,
                        primary25: "#8affd0",
                        primary: "black",
                      },
                    })}
                    styles={{
                      menu: (provided) => ({ ...provided, zIndex: 999999 }),
                    }}
                    menuPortalTarget={document.body}
                    menuPosition={"fixed"}
                    onChange={(e) => handelChangeUuserSelect(e)}
                  />
                </div>
                <div className="col-sm-4">
                  {" "}
                  <Select
                    options={getBooklist}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    onChange={(e) => handelTeamMember(e)}
                    isMulti
                    styles={{
                      menu: (provided) => ({ ...provided, zIndex: 999999 }),
                    }}
                    theme={(theme) => ({
                      ...theme,
                      colors: {
                        ...theme.colors,
                        primary25: "#8affd0",
                      },
                    })}
                    menuPortalTarget={document.body}
                    menuPosition={"fixed"}
                    getOptionLabel={(options) => options.title}
                    getOptionValue={(options) => options}
                    value={getBooklist.filter((la) => bookData.includes(la))}
                    isClearable
                    isSearchable
                  />
                </div>
                <div className="col-sm-3">
                  {" "}
                  <input
                    type="date"
                    className="form-control"
                    value={rentData}
                    onChange={(e) => setRentDate(e.target.value)}
                  />
                </div>
                <div className="col-sm-1 p-1">
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => mappingData()}
                  >
                    Mapping{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserRentBook;
