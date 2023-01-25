import React, { useState } from "react";
import "./login.css";
import sing from "../../assets/images/boo.jpg";
import { useDispatch } from "react-redux";
import { addUser, loginUser } from "../../service/Serivice";
import { useNavigate } from "react-router-dom";
import { alertMessage } from "../../component/PopupMessages";
function Loginpage() {
  const [loginfieldShow, setLoginfieldShow] = useState(false);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
  });
  const hangelcloselogin = () => {
    setLoginfieldShow(false);
    setInputValue({
      name: "",
      email: "",
      password: "",
    });
  };
  const signin = (type) => {
    if (type === "login") {
      const data = {
        email: inputValue.email,
        password: inputValue.password,
      };
      if (inputValue.email && inputValue.password) {
        dispatch(loginUser(data, nav));
      } else {
        alertMessage(
          "error",
          `Enter  ${inputValue.email ? "" : "Email"} ${
            inputValue.password ? "" : "Password"
          }`
        );
      }
    } else {
      const data = {
        name: inputValue.name,
        email: inputValue.email,
        password: inputValue.password,
      };
      if (inputValue.email && inputValue.name && inputValue.password) {
        dispatch(addUser(data, nav));
      } else {
        alertMessage(
          "error",
          `Enter ${inputValue.name ? "" : "Name"} ${
            inputValue.email ? "" : "Email"
          } ${inputValue.password ? "" : "Password"}`
        );
      }
    }
  };
  return (
    <div>
      <main className="d-flex align-items-center min-vh-100 p-3 py-md-0">
        <div className="container">
          <div className="card login">
            <div className="row">
              <div className="col-md-4">
                <img src={sing} alt="login" className="login-card-img" />
              </div>
              <div className="col-md-8 P-0">
                <div className="card-body">
                  <div className="row d-flex flex-column align-items-center  py-md-0">
                    {!loginfieldShow ? (
                      <div className="col-md-6">
                        <label className="label">Name</label>
                        <input
                          className="form-control"
                          placeholder="Enter Name"
                          type={"text"}
                          value={inputValue.name}
                          onChange={(e) => {
                            setInputValue({
                              ...inputValue,
                              name: e.target.value,
                            });
                          }}
                        />
                      </div>
                    ) : null}
                    <div className="col-md-6">
                      <label className="label">Enter Email</label>
                      <input
                        className="form-control"
                        placeholder="Enter Email"
                        type={"email"}
                        value={inputValue.email}
                        onChange={(e) => {
                          setInputValue({
                            ...inputValue,
                            email: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="label">Enter password</label>
                      <input
                        className="form-control"
                        placeholder="Enter password"
                        type={"password"}
                        value={inputValue.password}
                        onChange={(e) => {
                          setInputValue({
                            ...inputValue,
                            password: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="row p-3">
                    <div className="col-md-12 d-flex justify-content-evenly">
                      {!loginfieldShow ? (
                        <>
                          <button
                            className="btn btn-primary btn-md"
                            onClick={() => signin("sign")}
                          >
                            Sign in
                          </button>
                          <button
                            className="btn btn-success btn-md"
                            onClick={() => {
                              setLoginfieldShow(true);
                              setInputValue({
                                name: "",
                                email: "",
                                password: "",
                              });
                            }}
                          >
                            Login
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="btn btn-primary btn-md"
                            onClick={() => hangelcloselogin()}
                          >
                            Back
                          </button>
                          <button
                            className="btn btn-success btn-md"
                            onClick={() => signin("login")}
                          >
                            Login
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Loginpage;
