import React from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import core from './core'
import models from './models'

import BasicLayout from './layout/BasicLayout'
import Demo01 from './views/Demo01'
import Demo02 from './views/Demo02'

const app = core()
app.router(() => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<BasicLayout ><Outlet /></BasicLayout>}>
                    <Route index element={<Demo01 />} />
                    <Route path='/demo02' element={<Demo02 />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
})
app.models(models)

app.start('#root')
