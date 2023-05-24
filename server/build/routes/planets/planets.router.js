import { Router } from 'express';
import * as planetsController from './planets.controller.js';
const planetsRouter = Router();
const getAllPlanets = () => { };
planetsRouter.get('/', planetsController.httpGetAllPlanets);
export default planetsRouter;
