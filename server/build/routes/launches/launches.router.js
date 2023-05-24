import { Router } from 'express';
import { httpAddNesLaunch, httpGetAllLaunches } from './launches.controller.js';
const launchRouter = Router();
launchRouter.get('/', httpGetAllLaunches);
launchRouter.post('/', httpAddNesLaunch);
export default launchRouter;
