const express = require('express');
const router = express.Router();
const ttsController = require('../controllers/ttsController');
router.get('/', ttsController.speak);
module.exports = router;
