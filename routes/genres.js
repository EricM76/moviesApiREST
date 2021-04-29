const express = require('express');
const router = express.Router();

const controller = require('../controllers/genresController')

router.get('/', controller.getAll); 
router.post('/create', controller.create); 
router.get('/:id', controller.getById);
router.put('/update/:id',controller.update); 
router.delete('/delete/:id',controller.delete); 

module.exports = router