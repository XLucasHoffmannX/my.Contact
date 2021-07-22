const router = require('express').Router();
const contactsCtrl = require('../controllers/contactsCtrl');
const auth = require('../middlewares/auth');

// contacts
router.get('/contacts', auth, contactsCtrl.viewContacts);

router.post('/create-contact', auth, contactsCtrl.createContact);

// edit
router.put('/edit-contact/:id', auth, contactsCtrl.editContact);

// remove
router.delete('/remove-contact/:id', auth, contactsCtrl.removeContact)

module.exports = router;