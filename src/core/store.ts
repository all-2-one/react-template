import { legacy_createStore as createStore, applyMiddleware, compose } from "redux"
import createSagaMiddleware from 'redux-saga'
import { getRootReducers } from "./getRootReducers"
import { getSagas } from "./getRootSaga"
import { IModel } from "./type"

const getStore = (models: IModel[]) => {
    const rootReducer = getRootReducers(models)

    const composeEnhancers =
        typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            })
            : compose;

    const sagaMiddleware = createSagaMiddleware()
    const enhancer = composeEnhancers(
        applyMiddleware(sagaMiddleware)
    );

    const store = createStore(rootReducer, enhancer)
    const sagas = getSagas(models)
    sagas.forEach(sagaMiddleware.run)

    return store
}

export default getStore
