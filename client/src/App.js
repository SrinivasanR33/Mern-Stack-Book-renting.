import "./App.css";
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./component/Navbar";
import SideBar from "./component/SideBar";
import Home from "./pages/home/Home";
import Bookslist from "./pages/booklist/Bookslist";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBook from "./pages/searchbook/SearchBook";
import Addbook from "./pages/addbook/Addbook";
import Loginpage from "./pages/login/Loginpage";
import { useDispatch, useSelector } from "react-redux";
import UserInfo from "./pages/userinfo/UserInfo";
import UserRentBook from "./pages/Userbook/UserRentBook";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const role = localStorage.getItem("role");
  const dispatch = useDispatch();

  // const { loginstate } = useSelector((state) => state.Books);
  const { getBooklist, loginstate } = useSelector((state) => state.Books);

  console.log(loginstate);

  const localS = localStorage.getItem("email");
  return (
    <Router>
      <ToastContainer />
      {loginstate === 1 ? (
        <>
          <Navbar />
          <SideBar />
        </>
      ) : null}
      <div className="menu">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books/list" element={<Bookslist />} />
          <Route path="/books/search" element={<SearchBook />} />
          <Route path="/add/book" element={<Addbook />} />
          <Route path="/user" element={<UserInfo />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/rent/book" element={<UserRentBook />} />

          {loginstate === 1 ? (
            <Route render={() => <Navigate to="/" />} />
          ) : (
            <Route render={() => <Navigate to="/login" />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
