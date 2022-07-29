// import React from "react";
// import { IRoute } from "../core/type";

// import Demo02 from "../views/Home/Demo02";

// import BasicLayout from "../layout/BasicLayout";

// const routes: IRoute[] = [
//     {
//         path: '/',
//         component: BasicLayout,
//         redirect: '/index',
//         children: [
//             {
//                 path: 'index',
//                 name: 'demo01',
//                 component: React.lazy(() => import('../views/Demo01/index'))
//                 // component: () => import('../views/Home/Demo01/index')
//             },
//             {
//                 path: 'demo02',
//                 component: Demo02
//             }
//         ]
//     },
//     {
//         path: '/login',
//         component: React.lazy(() => import('../views/Login/index'))
//     },
//     {
//         path: '/dynaimc',
//         component: BasicLayout,
//         children: [
//             {
//                 path: ':id',
//                 component: React.lazy(() => import('../views/Dynaimc/Photo'))
//             }
//         ]
//     },
//     {
//         path: '/nested',
//         component: BasicLayout,
//         redirect: '/nested/layout',
//         children: [
//             {
//                 // index: true,
//                 path: 'layout',
//                 name: 'NestedLayout',
//                 component: React.lazy(() => import('../views/Nested/Layout')),
//                 children: [
//                     {
//                         // index: true,
//                         path: 'a',
//                         name: 'NestedA',
//                         component: React.lazy(() => import('../views/Nested/A/index'))
//                     },
//                     {
//                         path: 'b',
//                         component: React.lazy(() => import('../views/Nested/B/index'))
//                     }
//                 ]
//             }
//         ]
//     }
// ]

// export default routes
