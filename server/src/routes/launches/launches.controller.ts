import { Request, Response } from 'express'
import { getAllLaunches, addNewLaunch, existsLaunchWithId, abortLaunchById } from '../../models/launches.model.js'

export async function httpGetAllLaunches(req: Request, res: Response) {
  return res.status(200).json(await getAllLaunches())
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

export async function httpAbortLaunch(req: Request, res: Response) {
  const launchId = req.params.id

  if (!existsLaunchWithId(launchId)) {
    return res.status(404).json({
      error: 'Launch not found',
    })
  }

  const aborted = abortLaunchById(launchId)
  return res.status(200).json(aborted)
}
