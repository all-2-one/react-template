import React from "react";
import { IRoute } from "../core/type";

import Demo02 from "../views/Home/Demo02";

import BasicLayout from "../layout/BasicLayout";

const routes: IRoute[] = [
    {
        path: '/',
        component: BasicLayout,
        children: [
            {
                path: 'demo01',
                component: React.lazy(() => import('../views/Home/Demo01/index'))
            },
            {
                path: 'demo02',
                component: Demo02
            }
        ]
    },
    {
        path: '/login',
        component: React.lazy(() => import('../views/Login/index'))
    },
    {
        path: '/dynaimc',
        component: BasicLayout,
        children: [
            {
                path: ':id',
                component: React.lazy(() => import('../views/Dynaimc/Photo'))
            }
        ]
    }
]

export default routes
