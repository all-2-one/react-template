import { ClassicComponent, FunctionComponentElement } from 'react'
import { RouteProps } from 'react-router-dom'

type IRouteComponent = FunctionComponentElement | ClassicComponent | React.LazyExoticComponent<() => JSX.Element>

export type IRoute = (Omit<RouteProps, 'element' | 'children'> & { component: IRouteComponent, children?: IRoute[] })

export interface IAction<P = any> {
    type: string,
    payload: P
}

export interface IReducer<T> {
    (state: T, action: IAction): T
}

export interface IModel<T extends object> {
    namespace: string
    state: T,
    reducers: Record<string, IReducer<T>>,
    // effects: 
}