import React, { Suspense } from "react"
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"
import { IRoute } from "./type"

interface RouterProps {
    routes: IRoute[]
}

const getRouteChildren = (_routes: IRoute[]) => {
    return _routes.map(route => {
        const { component: Component } = route
        return (
            <Route
                key={route.path}
                path={route.path}
                element={<Component><Outlet /></Component>}
            >
                {
                    route.children
                        ? getRouteChildren(route.children)
                        : null
                }
            </Route>
        )
    })
}

const Router: React.FC<RouterProps> = (props) => {
    const { routes } = props

    const routesChildren = React.useMemo(() => getRouteChildren(routes), [routes])

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BrowserRouter>
                <Routes>
                    {routesChildren}
                </Routes>
            </BrowserRouter>
        </Suspense>
    )
}

export default React.memo(Router)
