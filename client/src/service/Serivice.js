import axios from "axios";
import { alertMessage } from "../component/PopupMessages";
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});
export const loadingPage = (loadingpage) => async (dispatch, getState) => {
  dispatch({
    type: "GLOBLE_LOADING",
    payload: loadingpage,
  });
};

export const getAllBooks = () => async (dispatch, getState) => {
  api.get(`/books`).then((val) => {
    console.log(val);
    dispatch({
      type: "GET_BOOKS",
      payload: val.data.data,
    });
  });
};
export const SearchBooks = (data) => async (dispatch, getState) => {
  api.post(`/books/search`, data).then((val) => {
    console.log(val);
    if (val.data.data && val.data.data.length > 0) {
      dispatch({
        type: "GET_SEARCH_BOOK",
        payload: val.data.data,
      });
    } else {
      dispatch({
        type: "GET_SEARCH_BOOK",
        payload: [],
      });
    }
  });
};
export const BookInfo = (data) => async (dispatch, getState) => {
  dispatch(loadingPage(true));

  api.post(`/books/info`, data).then((val) => {
    console.log(val);
    if (val.data.data && val.data.data.length > 0) {
      dispatch(loadingPage(false));
      dispatch({
        type: "GET_BOOK_INFO",
        payload: val.data.data,
      });
    } else {
      dispatch(loadingPage(false));
      dispatch({
        type: "GET_BOOK_INFO",
        payload: [],
      });
    }
  });
};
export const CreateBook = (data) => async (dispatch, getState) => {
  api.post(`/books/add`, data).then((val) => {
    console.log(val);
    if (val.data.data && val.data.data.length > 0) {
      dispatch({
        type: "GET_BOOK_INFO",
        payload: val.data.data,
      });
    } else {
      dispatch({
        type: "GET_BOOK_INFO",
        payload: [],
      });
    }
  });
};
export const UpdateBook = (data) => async (dispatch, getState) => {
  api.put(`/books/update`, data).then((val) => {
    console.log(val);
    if (val.data.data && val.data.data.length > 0) {
      dispatch({
        type: "GET_BOOK_INFO",
        payload: val.data.data,
      });
    } else {
      dispatch({
        type: "GET_BOOK_INFO",
        payload: [],
      });
    }
  });
};
export const bookRenting = (data) => async (dispatch, getState) => {
  api
    .post(`/rent/list`, {
      "userInfo.email": data.userInfo ? data.userInfo.email : null,
    })
    .then((val) => {
      console.log(val);
      if (val.data && val.data.success) {
        alert("already mapped");
      } else {
        api.post(`/rent/mapping`, data).then((val) => {
          console.log(val);
          if (val.data.data && val.data.data.length > 0) {
            dispatch({
              type: "GET_RENTMAPPING",
              payload: val.data.data,
            });
          } else {
            dispatch({
              type: "GET_RENTMAPPING",
              payload: [],
            });
          }
        });
      }
    });
};
export const bookRentingList = (data) => async (dispatch, getState) => {
  dispatch(bookRenting({ _id: data.id })).then((val) => {
    if (val.data.success) {
      alert("already mapped");
    } else {
      api.post(`/rent/list`, data).then((val) => {
        console.log(val);
        if (val.data.data && val.data.data.length > 0) {
          dispatch({
            type: "GET_RENTLIST",
            payload: val.data.data,
          });
        } else {
          dispatch({
            type: "GET_RENTLIST",
            payload: [],
          });
        }
      });
    }
  });
};
export const deleteBook = (id) => async (dispatch, getState) => {
  console.log(id);

  api
    .delete(`/books/delete/${id}`)
    .then((val) => {
      console.log(val);
      dispatch(getAllBooks());
      return val;
    })
    .catch((err) => console.log(err));
};
export const addUser = (data, nav) => async (dispatch, getState) => {
  api.post(`/user/search/`, { email: data.email }).then((val) => {
    console.log(val);
    if (val.data.success) {
      if (
        val.data.data[0].email === data.email &&
        val.data.data[0].password === data.password
      ) {
        alert("email already exist");
        dispatch({ type: "LOGIN_STATE", payload: 0 });
      } else {
        api
          .post(`/add/user/`, data)
          .then((val) => {
            console.log(val);
            dispatch({ type: "LOGIN_STATE", payload: 1 });
            alertMessage("success", "Signin Successfully");
            dispatch({ type: "LOGIN_DATA", payload: val.data.data });
            nav("/");
            localStorage.setItem("role", val.data.data[0].role);
            localStorage.setItem("email", val.data.data[0].email);
            localStorage.setItem("name", val.data.data[0].name);
            return val;
          })
          .catch((err) => console.log(err));
      }
    } else {
      api
        .post(`/add/user/`, data)
        .then((val) => {
          console.log(val);
          dispatch({ type: "", payload: true });
          nav("/");
          dispatch({ type: "LOGIN_DATA", payload: val.data.data });
          localStorage.setItem("role", val.data.data.role);
          localStorage.setItem("email", val.data.data.email);
          localStorage.setItem("name", val.data.data.name);
          return val;
        })
        .catch((err) => console.log(err));
    }
  });
};
export const getUser = () => async (dispatch, getState) => {
  api
    .get(`/user/list/`)
    .then((val) => {
      console.log(val);
      dispatch({
        type: "USER_LIST",
        payload: val.data.data,
      });
      return val;
    })
    .catch((err) => console.log(err));
};
export const deleteUserData = (data) => async (dispatch, getState) => {
  api
    .put(`/user/remove`, data)
    .then((val) => {
      console.log(val);
      dispatch(getUser());
      return val;
    })
    .catch((err) => console.log(err));
};
export const UserSend = (data) => async (dispatch, getState) => {
  api
    .post(`/user/sendmail`, data)
    .then((val) => {
      console.log(val);
      return val;
    })
    .catch((err) => console.log(err));
};
export const loginUser = (data, nav) => async (dispatch, getState) => {
  api
    .post(`/user/search/`, { email: data.email })
    .then((val) => {
      console.log(val);
      if (
        val.data.data[0].email === data.email &&
        val.data.data[0].password === data.password
      ) {
        dispatch({ type: "LOGIN_STATE", payload: 1 });
        alertMessage("success", "Login Successfully");
        nav("/");
        localStorage.setItem("role", val.data.data[0].role);
        localStorage.setItem("email", val.data.data[0].email);
        localStorage.setItem("name", val.data.data[0].name);
        dispatch({ type: "LOGIN_DATA", payload: val.data.data });
      } else {
        dispatch({ type: "LOGIN_STATE", payload: 0 });
        alert("Bad Credencial");
      }
      return val;
    })
    .catch((err) => console.log(err));
};
export const findtheUser = (data) => async (dispatch, getState) => {
  api
    .post(`/user/search/`, { email: data.email })
    .then((val) => {
      dispatch({ type: "FINDUSER", payload: val.data.data });
    })
    .catch((err) => console.log(err));
};
