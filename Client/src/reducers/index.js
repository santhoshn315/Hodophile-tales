import { combineReducers } from "redux";
import theme from "./theme";
import posts from "./posts";
import authReducer from "./Auth";

export const reducers = combineReducers({authReducer, posts, theme });
