import { combineReducers, Reducer } from "redux";
import { IModel } from "./type";

export const getRootReducers = (models: IModel[]) => {
    const reducerMap: Record<string, Reducer> = {}

    models.forEach(model => {
        reducerMap[model.namespace] = getModelReducer(model)
    })

    return combineReducers(reducerMap)
}

const getModelReducer = (model: IModel): Reducer => {
    return (state = model.state, action) => {
        const { reducers = {} } = model
        const reducer = reducers[action.type]
        return reducer ? reducer(state, action) : state
    }
}