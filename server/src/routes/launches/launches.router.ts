import { Router } from 'express'

import { httpAddNesLaunch, httpGetAllLaunches, httpAbortLaunch } from './launches.controller.js'

const launchRouter = Router()

launchRouter.get('/', httpGetAllLaunches)
launchRouter.post('/', httpAddNesLaunch)
launchRouter.delete('/:id', httpAbortLaunch)

export default launchRouter
