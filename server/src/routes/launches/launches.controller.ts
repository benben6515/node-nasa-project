import { Request, Response } from 'express'
import { getAllLaunches, addNewLaunch } from '../../models/launches.model.js'

export function httpGetAllLaunches(req: Request, res: Response) {
  return res.status(200).json(getAllLaunches())
}

export async function httpAddNesLaunch(req: Request, res: Response) {
  const launch = req.body

  if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
    return res.status(400).json({
      error: 'Missing required launch property',
    })
  }
  launch.launchDate = new Date(launch.launchDate)
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: 'Invalid launch date',
    })
  }
  await addNewLaunch(launch)
  return res.status(201).json(launch)
}
