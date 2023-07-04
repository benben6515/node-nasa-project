import { getAllPlanets } from '../../models/planets.model.js';
export const httpGetAllPlanets = async (req, res, next) => {
    return res.status(200).json(await getAllPlanets());
};
