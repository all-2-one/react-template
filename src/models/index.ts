import globalModel, { GlobalState } from "./global";

const models = [globalModel]

export interface ModelState {
    global: GlobalState
}

export default models