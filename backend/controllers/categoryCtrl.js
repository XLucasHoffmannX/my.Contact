const Users = require('../models/userModel');
const Category = require('../models/categoryModel');

const categoryCtrl = {
  getCategory: async (req, res)=>{
    try {
      const category = await Category.find({ userTo: req.user.id })

      res.json(category)
    } catch (err) { res.status(500).json({ msg: err.message }) }
  },
  createCategory: async (req, res) => {
    const {category} = req.body
    try {
      if (!(category)) return res.status(400).json({ msg: "Erro, falta de parâmetros!" })
      
      const user = await Users.findById(req.user.id).select("-password");
      if (!user) return res.status(400).json({ msg: "Usuário não logado!" });

      const newCategory = new Category({ category, userTo: req.user.id })

      await newCategory.save();

      res.json(newCategory)
    } catch (err) { res.status(500).json({ msg: err.message }) }
  },
  removeCategory: async (req, res)=>{
    try {
      await Category.findByIdAndDelete(req.params.id);
      res.json({ msg: "Removido" })
    } catch (err) { res.status(500).json({ msg: err.message }) }
  }
}

module.exports = categoryCtrl;