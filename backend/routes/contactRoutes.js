const express = require('express');
const router = express.Router();
const { getContacts, createContact, updateContact, deleteContact } = require('../controllers/contactController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/',       getContacts);
router.post('/',      authMiddleware, createContact);
router.put('/:id',    authMiddleware, updateContact);
router.delete('/:id', authMiddleware, deleteContact);

module.exports = router;