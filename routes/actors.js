const express = require('express');
const router = express.Router();

const controller = require('../controllers/actorsController')

router.get('/', controller.getAll); //---> devuelve todos los actores
router.post('/create', controller.create); //---> permite crear un actor
router.get('/:id', controller.getById); //---> devuelve el actor segun parametro
router.put('/update/:id',controller.update);
router.delete('/delete/:id',controller.delete)
module.exports = router