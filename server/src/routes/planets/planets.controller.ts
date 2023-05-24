import { Request, Response, NextFunction } from 'express'
import { getAllPlanets } from '../../models/planets.model.js'

export const httpGetAllPlanets = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json(getAllPlanets())
}
