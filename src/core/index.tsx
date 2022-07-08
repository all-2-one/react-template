import { createRoot } from 'react-dom/client'
import React from 'react'
import { Provider } from 'react-redux'

import { IModel, IRoute } from "./type"
import Router from './Router'
import getStore from './store'

class App {
    private _routes: IRoute[] = []

    private _models: IModel<Record<string, unknown>>[] = []

    public start(element: string | HTMLElement) {
        const container = typeof element === 'string'
            ? document.querySelector(element)!
            : element
        const root = createRoot(container)
        const store = getStore(this._models)

        root.render(
            <Provider store={store}>
                <Router routes={this._routes} />
            </Provider>
        )
    }

    public router(routes: IRoute[]) {
        this._routes = routes
    }

    public model(models: IModel<any>[]) {
        this._models = models
    }
}

const generateApp = () => {
    return new App()
}

export default generateApp
