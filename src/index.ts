const express = require('express');
import ArtistasController from './app/controllers/ArtistasController';
import GenerosMusicaisController from './app/controllers/GenerosMusicaisController';

const app = express();

app.use(express.json());

app.get('/artistas/', ArtistasController.index);
app.get('/artistas/:id', ArtistasController.show);
app.post('/artistas/', ArtistasController.store);
app.put('/artistas/:id', ArtistasController.update);
app.delete('/artistas/:id', ArtistasController.delete);

app.get('/generosMusicais/', GenerosMusicaisController.index);
app.get('/generosMusicais/:id', GenerosMusicaisController.show);
app.post('/generosMusicais/', GenerosMusicaisController.store);
app.put('/generosMusicais/:id', GenerosMusicaisController.update);
app.delete('/generosMusicais/:id', GenerosMusicaisController.delete);

export default app;
