import planetModel from '../../models/planets.model.js';
export const getAllPlanets = (req, res, next) => {
    const { planets } = planetModel;
    console.log(planets);
    return res.status(200).json(planets);
};
