const express = require('express');
const router = express.Router();

const {getAll,getById,create,update,remove} = require('../controllers/moviesController')

router.get('/', getAll); //---> devuelve todas las peliculas
router.post('/create', create); //---> permite crear una pelicula
router.get('/:id', getById); //---> devuelve una pelicula segun parametro
router.put('/update/:id',update); //--->  actualiza los datos de la pelicula
router.delete('/delete/:id',remove); //---> elimina una pelicula

module.exports = router