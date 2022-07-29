import React, { Suspense } from "react"
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom"
import Loading from "./Loading"
import { IRoute } from "./type"

interface RouterProps {
    routes: IRoute[]
}

/**
 * todo
 * redirect
 */

const getRouteChildren = (_routes: IRoute[]) => {
    return _routes.map(route => {
        const { component: Component } = route

        const redirectChildren: Partial<IRoute>[] = !route.redirect
            ? []
            : [{
                path: '*',
                redirect: route.redirect
            }]

        if (route.path === "*") {
            return (
                <Route
                    key={`redirect_${route.redirect}`}
                    path="*"
                    element={<Navigate to={route.redirect!} replace />}
                />
            )
        }

        return (
            <Route
                key={route.path || route.name}
                path={route.path}
                element={
                    <Suspense fallback={<Loading />}>
                        <Component>
                            <Outlet />
                        </Component>
                    </Suspense>
                }
            >
                {
                    route.children
                        ? getRouteChildren([...route.children, ...redirectChildren as any[]])
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
        <BrowserRouter>
            <Routes>
                {routesChildren}
            </Routes>
        </BrowserRouter>
    )
}

export default React.memo(Router)
