const express = require('express');

const controller = require('./../controllers/videoController');

const router = express.Router();

router.use(
  controller.checkUrl,
  controller.checkFile,
  controller.checkRange,
  controller.sendFile
);
// router.param('id', controller.checkFile);
// router.route('/:id').get();

module.exports = router;
