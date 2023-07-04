import { Request, Response, NextFunction } from 'express'
import { getAllPlanets } from '../../models/planets.model.js'

export const httpGetAllPlanets = async (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json(await getAllPlanets())
}
