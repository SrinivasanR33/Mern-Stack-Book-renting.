const initialState = {
  getBooklist: [],
  bookSearch: [],
  bookdetails: [],
  loginstate: 1,
  loginData: [],
  userList: [],
  rentList: [],
  findUser: [],
};

const booksReducer = (state = { initialState, overlaypage: false }, action) => {
  switch (action.type) {
    case "GET_BOOKS":
      return {
        ...state,
        getBooklist: action.payload,
      };
    case "USER_LIST":
      return {
        ...state,
        userList: action.payload,
      };
    case "GLOBLE_LOADING":
      return {
        ...state,
        overlaypage: action.payload,
      };
    case "GET_SEARCH_BOOK":
      return {
        ...state,
        bookSearch: action.payload,
      };
    case "GET_BOOK_INFO":
      return {
        ...state,
        bookdetails: action.payload,
      };
    case "LOGIN_STATE":
      return {
        ...state,
        loginstate: action.payload,
      };
    case "LOGIN_DATA":
      return {
        ...state,
        loginData: action.payload,
      };
    case "FINDUSER":
      return {
        ...state,
        findUser: action.payload,
      };
    case "GET_RENTLIST":
      return {
        ...state,
        rentList: action.payload,
      };

    default:
      return state;
  }
};

export default booksReducer;
