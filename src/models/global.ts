import { IModel } from "../core/type";

export interface GlobalState {
    username: string
    token: string
}

const globalModel: IModel<GlobalState> = {
    namespace: 'global',
    state: {
        username: 'allen',
        token: 'initail'
    },
    reducers: {
        setToken(state, { payload }) {
            return {
                ...state,
                token: payload
            }
        }
    },
    effects: {
        * asyncSetToken(action, { call, put, delay }) {
            yield call(delay, 1000)
            yield put({ type: 'setToken', payload: action.payload })
        }
    }
}

export default globalModel