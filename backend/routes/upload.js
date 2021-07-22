const router = require('express').Router();
const cloudinary = require('cloudinary');
const auth = require('../middlewares/auth');
const fs = require('fs');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})

router.post('/upload', auth, (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0)
      return res.status(400).json({ msg: 'Nenhum arquivo!' })

    const file = req.files.file;
    if (file.size > 1024 * 1024) {
      removeTmp(file.tempFilePath)
      return res.status(400).json({ msg: "Arquivo muito grande!" })
    }

    if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
      removeTmp(file.tempFilePath)
      return res.status(400).json({ msg: "Formatos de imagens incompativeis!" })
    }

    cloudinary.v2.uploader.upload(file.tempFilePath, { folder: "myContact" }, async (err, result) => {
      if (err) throw err;

      removeTmp(file.tempFilePath)

      res.json({ public_id: result.public_id, url: result.secure_url })
    })


  } catch (err) { return res.status(500).json({ msg: err.message }) }
})

router.post('/destroy', auth, (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) return res.status(400).json({ msg: 'Nenhuma imagem selecionada!' })

    cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
      if (err) throw err;

      res.json({ msg: "Deleted Image" })
    })

  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
})

// remover arquivos da pasta tmp
const removeTmp = (path) => {
  fs.unlink(path, err => {
    if (err) throw err;
  })
}

module.exports = router;