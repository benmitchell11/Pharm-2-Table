const express = require('express');
const multer = require('multer');
const { createUser } = require('./controllers/userController');
const { createSupplier } = require('./controllers/supplierController');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/createUser', upload.single('image'), createUser);
router.post('/registerSupplier', createSupplier);

module.exports = router;
