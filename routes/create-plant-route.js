const express = require("express");
const createPlant = require('../controller/create-plant');
const routes = express.Router();

routes.post('/create-plant', createPlant.createSolarPlant);
routes.get('/get-plant/:id', createPlant.getSolarPlantById);
routes.get('/get-all-plant', createPlant.getAllSolarPlants);
routes.put('/update-plant/:id', createPlant.updateSolarPlant);
routes.delete('/delete-plant/:id', createPlant.deleteSolarPlant);
module.exports = routes