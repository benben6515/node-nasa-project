import { getAllPlanets } from '../../models/planets.model.js';
export const httpGetAllPlanets = (req, res, next) => {
    return res.status(200).json(getAllPlanets());
};
