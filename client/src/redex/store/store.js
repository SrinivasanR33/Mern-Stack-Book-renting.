import booksReducer from "../reducer/bookReducer";
import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
  compose,
} from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import { createBrowserHistory } from "history";
// import { routerMiddleware, connectRouter } from "connected-react-router";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { encryptTransform } from "redux-persist-transform-encrypt";

const persistConfig = {
  key: "root",
  storage,
  transforms: [
    encryptTransform({
      secretKey: "book-secret-key",
      onError: function (error) {
        // Handle the error.
        console.log(error);
      },
    }),
  ],
};

let middleware = [];
middleware = [...middleware, thunk];

const reducer = combineReducers({
  Books: booksReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(
  persistedReducer,
  compose(composeWithDevTools(applyMiddleware(...middleware)))
);

// export default store;
export const persistor = persistStore(store);
