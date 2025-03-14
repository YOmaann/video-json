const express = require('express')

const controller = require('../controllers/configController.js')

const router = express.Router()

router.use(controller)
module.exports = router
