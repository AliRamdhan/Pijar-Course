import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk"; // Import the thunk middleware

import rootReducer from "./reducers/index";

const middleware = [thunkMiddleware];
const composedEnhancer = composeWithDevTools(applyMiddleware(...middleware));
const store = createStore(rootReducer, composedEnhancer);

export default store;
