import React from "react";
import "../style/SideBar.css";
import { BsBook, BsSearch } from "react-icons/bs";
import { FaBookReader } from "react-icons/fa";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiBookAdd, BiUser } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function SideBar() {
  const nav = useNavigate();
  return (
    <div className="sidbar">
      <div className="mainitem">
        <div className="smallitem" onClick={() => nav("/")}>
          <span className="icon">
            <AiOutlineHome />
          </span>
          <span className="icon-text">Home</span>
        </div>
        <div className="smallitem" onClick={() => nav("/books/list")}>
          <i className="icon">
            <BsBook />
          </i>
          <span className="icon-text">Book List</span>
        </div>
        <div className="smallitem" onClick={() => nav("/books/search")}>
          <i className="icon">
            <BsSearch />
          </i>
          <span className="icon-text">Book Search</span>
        </div>
        <div className="smallitem" onClick={() => nav("/add/book")}>
          <i className="icon">
            <BiBookAdd />
          </i>
          <span className="icon-text">Add Book</span>
        </div>
        <div className="smallitem">
          <i className="icon">
            <AiOutlineMail />
          </i>
          <span className="icon-text">Send Mail</span>
        </div>
        <div className="smallitem" onClick={() => nav("/user")}>
          <i className="icon">
            <BiUser />
          </i>
          <span className="icon-text">User Info</span>
        </div>
        <div className="smallitem" onClick={() => nav("/rent/book")}>
          <i className="icon">
            <FaBookReader />
          </i>
          <span className="icon-text">Rent Book</span>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
