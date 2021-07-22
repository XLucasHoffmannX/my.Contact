const Users = require('../models/userModel');
const Contacts = require('../models/contactsModel');

const contactsCtrl = {
  viewContacts: async (req, res) => {
    try {
      let name = "";
      let category="";
      if (req.query.name !== null && req.query.name !== '') {
        name = new RegExp(req.query.name, 'i')
      }
      if (req.query.category !== null && req.query.category !== '' ) {
        category = new RegExp(req.query.category, 'i')
      }
      try {
        const contacts = await Contacts.find({ userTo: req.user.id, name, colection: category});
        return res.json(contacts)
      } catch (error) {
        return res.json({ msg: error })
      }

    } catch (err) { res.status(500).json({ msg: err.message }) }
  },
  createContact: async (req, res) => {
    const { name, description, email, images, numberContacts, colection } = req.body;
    try {
      if (!(name || email || description || numberContacts || colection)) return res.status(400).json({ msg: "Erro, falta de parâmetros!" })

      const user = await Users.findById(req.user.id).select("-password")
      if (!user) return res.status(400).json({ msg: "Usuário não logado!" })

      const newContact = new Contacts({
        name, email, description, colection, images, numberContacts, userTo: user.id
      })

      newContact.save();

      res.json(newContact)
    } catch (err) { res.status(500).json({ msg: err.message }) }
  },
  editContact: async (req, res) => {
    const { name, description, numberContacts, images, colection } = req.body;
    try {
      if (!(name || description || numberContacts || colection)) return res.status(400).json({ msg: "Erro, falta de parâmetros!" })
      const contacts = await Contacts.findByIdAndUpdate({ _id: req.params.id }, {
        name, description, images, numberContacts, colection
      });

      console.log(contacts)

      res.json();
    } catch (err) { res.status(500).json({ msg: err.message }) }

  },
  removeContact: async (req, res) => {
    try {
      await Contacts.findByIdAndDelete(req.params.id);
      res.json({ msg: "Removido" })
    } catch (err) { res.status(500).json({ msg: err.message }) }
  }
}

module.exports = contactsCtrl;