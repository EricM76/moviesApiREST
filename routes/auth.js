const express = require('express');
const router = express.Router();

const {index, register, login, profile } = require('../controllers/authController')

router.get('/',index)
router.post('/register', register); 
router.post('/login', login); 
router.get('/profile', profile); 

module.exports = router