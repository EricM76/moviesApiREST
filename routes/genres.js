const express = require('express');
const router = express.Router();

const controller = require('../controllers/genresController')

router.get('/', controller.getAll); //---> devuelve todos los generos
router.post('/create', controller.create); //---> permite crear un genero
router.get('/:id', controller.getById); //---> devuelve el genero segun parametro
router.put('/update/:id',controller.update); //--->  actualiza los datos de un género
router.delete('/delete/:id',controller.delete); //---> elimina un genero

module.exports = router