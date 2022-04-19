import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { postAPI } from "../services/LinkService";
import linkReducer from "./reducers/linkReducer";

const rootReducer = combineReducers({
  linkReducer,
  // Як ключ редюсеру вказуємо унікальний ключ який ми записували
  // Як значення додаємо сам middleware який лежить в - postAPI.reducer
  [postAPI.reducerPath]: postAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      // getDefaultMiddleware дозвляє отримати дефолтний middleware які вже підключені до redux/toolkit, наприклад по замовчуванні там іде redux-thunk і з допомгою concat додаємо туди наш middleware що отримуємо з нашого postAPI
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(postAPI.middleware),
  });
};

const store = setupStore();

//const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

export const persistor = persistStore(store);

export default store;
