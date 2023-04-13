import { Router } from 'express';
import * as planetsController from './planets.controller.js';
const planetsRouter = Router();
const getAllPlanets = () => { };
planetsRouter.get('/planets', planetsController.getAllPlanets);
export default planetsRouter;
