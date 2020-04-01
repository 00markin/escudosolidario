const express = require('express');

const InputersController = require('./controllers/InputersController');
const HptController = require('./controllers/HptController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/inputers' , InputersController.index);
routes.post('/inputers', InputersController.create);

routes.get('/profile', ProfileController.index);

routes.get('/hpt', HptController.index);
routes.post('/hpt', HptController.create);
routes.delete('/hpt/:id', HptController.delete);

module.exports = routes;
