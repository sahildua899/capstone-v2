import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { createLogger } from "redux-logger";
import { rootReducer } from "./root-reducer";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";

const logger = createLogger();
const localStorageAdapter = storage.default || storage;

const persistConfig = {
  key: "root",
  storage: localStorageAdapter,
  whitelist: ["cart"],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [import.meta.env.DEV && logger, sagaMiddleware].filter(
  Boolean,
);

const composeEnhancer =
  (!import.meta.env.PROD &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));

export const store = createStore(persistedReducer, composedEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
