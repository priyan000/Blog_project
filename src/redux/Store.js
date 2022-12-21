import { applyMiddleware, createStore, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import HandleWatcherFunction from "./Sagas";
import Reducers from "./LogingReducers";

const sagamiddleware = createSagaMiddleware();
const store = createStore(
  Reducers,
  compose(applyMiddleware(sagamiddleware), composeWithDevTools())
);

sagamiddleware.run(HandleWatcherFunction);
export default store;
