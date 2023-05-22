import { Router } from 'express'

import { getAllLaunches } from './launches.controller.js'

const launchRouter = Router()

launchRouter.get('/launches', getAllLaunches)

export default launchRouter
