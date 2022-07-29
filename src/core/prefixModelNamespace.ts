import { IModel } from "./type";

export const prefixModelNamespace = (model: IModel): IModel => {
    const { reducers: oldReducers = {}, namespace, effects: oldEffects = {} } = model
    const reducers: IModel['reducers'] = {}
    for (const key in oldReducers) {
        reducers[`${namespace}/${key}`] = oldReducers[key]
    }

    const effects: IModel['effects'] = {}
    for (const key in oldEffects) {
        effects[`${namespace}/${key}`] = oldEffects[key]
    }

    return {
        ...model,
        reducers,
        effects
    }
}