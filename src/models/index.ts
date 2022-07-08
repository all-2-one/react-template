import globalModel, { GlobalState } from "./global";

const models = [globalModel]

export interface Model {
    global: GlobalState
}

export default models