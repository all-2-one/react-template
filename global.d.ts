declare module '*.svg' {
    const content: any
    export default content
}

declare module '.env.*' {
    const content: any
    export default content
}

declare module '*.less'
//  {
//     const content: { [className:string]: string}
//     export default content
// }

declare interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
}