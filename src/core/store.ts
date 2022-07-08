import { legacy_createStore as createStore, combineReducers, applyMiddleware, compose } from "redux"
import { IAction, IModel } from "./type"

const getStore = (models: IModel<any>[]) => {
    const reducers = models.reduce((prevReducer, model) => ({
        ...prevReducer,
        [model.namespace]: (modelState = model.state, action: IAction) => {
            const actionType = action.type.replace(
                new RegExp(`${model.namespace}/`),
                ''
            )

            const reducer = model.reducers[actionType]

            if (!reducer) {
                return modelState
            }

            return reducer(modelState, action) || modelState
        }
    }), {})

    const composeEnhancers =
        typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            })
            : compose;


    const enhancer = composeEnhancers(
        applyMiddleware()
    );

    return createStore(combineReducers(reducers), enhancer)
}

export default getStore
