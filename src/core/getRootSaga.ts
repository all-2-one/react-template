import { IEffect, IModel } from "./type";
import * as sagaEffects from 'redux-saga/effects'
import { Action } from "redux";

export const getSagas = (models: IModel[]) => {
    return models.map(getModelSaga)
}

const getModelSaga = (model: IModel) => {
    return function* () {
        const { effects } = model

        for (const key in effects) {
            const watcherSaga = createWatcherSaga(key, effects[key], model)
            yield sagaEffects.fork(watcherSaga)
        }
    }
}

const createWatcherSaga = (key: string, effect: IEffect, model: IModel) => {
    return function* () {
        const effects = {
            ...sagaEffects,
            delay: (ms: number) => {
                return new Promise(resolve => {
                    setTimeout(resolve, ms)
                })
            },
            put: (putAction: Action) => {
                return sagaEffects.put({
                    ...putAction,
                    type: putAction.type.includes('/')
                        ? putAction.type
                        : `${model.namespace}/${putAction.type}`
                })
            }
        }
        function* workSaga(action: Action) {
            yield effect(action as any, effects)
        }
        yield sagaEffects.takeEvery(
            key,
            workSaga
        )
    }
}