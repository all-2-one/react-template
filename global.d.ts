declare module '*.svg' {
    const content: any
    export default content
}

declare module '.env.*' {
    const content: any
    export default content
}

declare module '*.less'

declare interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
}