import { createRoot } from 'react-dom/client'
import React from 'react'
import { Provider } from 'react-redux'

import { IModel } from "./type"
import getStore from './store'
import { prefixModelNamespace } from './prefixModelNamespace'

class App {
    private _models: IModel<Record<string, unknown>>[] = []
    private _router?: () => React.ReactNode

    public start(element: string | HTMLElement) {
        const store = getStore(this._models)

        const container = typeof element === 'string'
            ? document.querySelector(element)!
            : element
        const root = createRoot(container)
        root.render(
            <Provider store={store}>
                {this._router?.()}
            </Provider>
        )
    }

    public router(router: () => React.ReactNode) {
        this._router = router
    }

    public models(models: IModel<any>[]) {
        this._models = models.map(prefixModelNamespace)
    }
}

const generateApp = () => {
    return new App()
}

export default generateApp
