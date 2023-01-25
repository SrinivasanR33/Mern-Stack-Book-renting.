import { Dropdown, OverlayTrigger, Popover, Tooltip } from "react-bootstrap";
import React from "react";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { SlOptionsVertical } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import "../style/Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { loginData } = useSelector((state) => state.Books);
  const email = localStorage.getItem("email");
  const dispatch = useDispatch();
  const nav = useNavigate();
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      style={{ color: "white" }}
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      &#x25bc;
    </a>
  ));
  return (
    <div className="navback">
      <div className="list">
        <div className="nav-items">
          <strong className="items">National Library</strong>
        </div>
        <div className="nav-items2">
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
              {email}
            </Dropdown.Toggle>

            <Dropdown.Menu variant="dark">
              <Dropdown.Item
                eventKey="1"
                onClick={() => {
                  dispatch({ type: "LOGIN_STATE", payload: 0 });
                  dispatch({ type: "GET_BOOKS", payload: [] });
                  dispatch({ type: "USER_LIST", payload: [] });
                  dispatch({ type: "GLOBLE_LOADING", payload: [] });
                  dispatch({ type: "GET_SEARCH_BOOK", payload: [] });
                  dispatch({ type: "GET_BOOK_INFO", payload: [] });
                  dispatch({ type: "LOGIN_DATA", payload: [] });
                  dispatch({ type: "FINDUSER", payload: [] });
                  dispatch({ type: "GET_RENTLIST", payload: [] });
                  nav("/login");
                }}
              >
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Navbar;
