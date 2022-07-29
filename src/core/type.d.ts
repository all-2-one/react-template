import { ClassicComponent, FunctionComponentElement, Reducer } from 'react'
import { RouteProps } from 'react-router-dom'

type IRouteComponent = FunctionComponentElement | ClassicComponent | React.LazyExoticComponent<() => JSX.Element>

export type IRoute = (Omit<RouteProps, 'element' | 'children' | 'index'> & {
    component: IRouteComponent,
    children?: IRoute[]
    name?: string
    redirect?: string
})

export interface IAction<P = any> {
    type: string,
    payload: P
}

export interface IReducer<T = any> {
    (state: T, action: IAction): T
}

export type IEffect = (action: IAction, effects: any) => Generator<any, void, any>

export interface IModel<T = any> {
    namespace: string
    state: T,
    reducers: Record<string, Reducer<T, any>>,
    effects: Record<string, IEffect>
}