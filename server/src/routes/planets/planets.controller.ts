import { Request, Response, NextFunction } from 'express'
import planetModel from '../../models/planets.model.js'

export const getAllPlanets = (req: Request, res: Response, next: NextFunction) => {
  const { planets } = planetModel
  // console.log(planets)
  return res.status(200).json(planets)
}
