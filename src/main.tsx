import core from './core'
import models from './models'
import routes from './router'

const app = core()
app.router(routes)
app.model(models)

app.start('#root')
