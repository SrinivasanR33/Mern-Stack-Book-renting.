import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBook,
  deleteUserData,
  getAllBooks,
  getUser,
  SearchBooks,
  UserSend,
} from "../../service/Serivice";

import { AiFillEdit, AiFillDelete } from "react-icons/ai";

import { BiEdit } from "react-icons/bi";
function UserInfo() {
  const dispatch = useDispatch();
  const { userList } = useSelector((state) => state.Books);
  console.log(userList);

  useEffect(() => {
    const getBooks = async () => {
      dispatch(getUser());
    };
    getBooks();
  }, []);
  const sendMail = (row) => {
    console.log(row);
    const emailData = {
      from: "vasan4649@gmail.com", // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
      to: row.email, // WHO SHOULD BE RECEIVING THIS EMAIL? IT SHOULD BE YOUR GMAIL
      subject: "Website Contact Form",
      text: `Sender name: ${row.name}`,
      html: `
          <h4>Email received from contact form:</h4>
          <p>Sender name: ${row.name}</p>
          <p>Sender email: ${row.email}</p>
          <hr />
          <p>This email may contain sensitive information</p>
          <p>https://onemancode.com</p>
      `,
    };
    dispatch(UserSend(emailData));
  };
  const deletedata = async (row) => {
    console.log(row);
    const data = {
      id: row,
    };
    await dispatch(deleteUserData(data));
  };
  return (
    <div className="contain">
      <div className="row">
        <div className="col-sm-11">
          <div className="card">
            <div className="card-header">
              <h5>User List</h5>
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
                      <th> Id</th>
                      <th className="text-center">Name</th>
                      <th className="text-center">User Email</th>

                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList &&
                      userList.length > 0 &&
                      userList.map((val, i) => (
                        <tr>
                          <td>{i + 1}</td>
                          <td>{val.name}</td>
                          <td>{val.email}</td>
                          <td>
                            <AiFillDelete
                              color="red"
                              onClick={() => deletedata(val._id)}
                            />
                          </td>
                          <td>
                            <BiEdit
                              color="blue"
                              onClick={() => sendMail(val)}
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

export default UserInfo;
