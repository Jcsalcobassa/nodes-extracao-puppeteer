const express = require('express');
const router = express.Router();
const certidoesController = require('../controllers/certidoesController');

router.post('/download', certidoesController.downloadCertidoes);
router.get('/status', (req, res) => res.json({ status: 'ready' }));

module.exports = router;
