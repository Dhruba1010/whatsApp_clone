import { applyMiddleware, compose, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { reducer } from "./reducer";

const composeEnhancer = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

export const store = legacy_createStore(reducer, composeEnhancer(applyMiddleware(thunk)));