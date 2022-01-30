const express = require('express');

const controller = require('../controllers/playerController.js');

const router = express.Router();

router.use(controller.checkUrl, controller.serve);

module.exports = router;
