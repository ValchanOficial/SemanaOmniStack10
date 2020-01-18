const { Router } = require('express');
const routes = Router();

const Health = require('../controllers/testController');
const DevController = require('../controllers/devController');
const SearchController = require('../controllers/searchController')

routes.get('/test', Health.test);

routes.get('/devs', DevController.findAll);
routes.get('/devs/:id', DevController.findOne);
routes.get('/search', SearchController.search);
routes.post('/devs', DevController.create);
routes.put('/devs/:id', DevController.update);
routes.delete('/devs/:id', DevController.delete);

module.exports = routes;