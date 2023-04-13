import http from 'http';
import app from './app.js';
import planetsModel from './models/planets.model.js';
(async () => {
    const PORT = process.env.PORT || 8000;
    const server = http.createServer(app);
    await planetsModel.loadPlanetsData();
    server.listen(PORT, async () => {
        console.log(`server listen at ${PORT}`);
    });
})();
