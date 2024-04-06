const express = require('express');
const { validateLoginInput, validateRegisterInput, handleValidationErrors}= require('../middleware/dataValidators')
const {signup, signin, } = require('../controllers/auth.controller')

const router= express.Router();

router.post('/signup',validateRegisterInput, handleValidationErrors, signup);
router.post('/signin',validateLoginInput, handleValidationErrors, signin);
// router.post('/google', google);
// router.post('/refresh', refreshToken)

module.exports= router;