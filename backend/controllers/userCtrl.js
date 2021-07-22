const Users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userCtrl = {
  register: async (req, res) => {
    const { name, email, phone, password } = req.body;
    try {
      if (!(name || email || phone || password)) return res.status(502).json({ msg: "Erro faltas de parâmetros!" })
      // verificar se o email já é existente
      const user = await Users.findOne({ email });
      if (user) return res.status(500).json({ msg: "Esse email já existe!" });

      // verificar password
      if (password.length < 6) return res.json({ msg: "A senha deve conter 6 ou mais caracteres" });

      const passwordEncrypt = await bcrypt.hash(password, 10);
      if (!passwordEncrypt) return res.json({ msg: "Error" });

      const newUser = new Users({
        name, email, phone, password: passwordEncrypt
      })

      await newUser.save();

      // tokens
      const accessToken = createToken({ id: newUser._id })
      const refreshToken = createRefreshToken({ id: newUser._id })

      res.cookie('refresh', refreshToken, {
        httpOnly: true,
        path: '/api/access/refresh'
      })

      return res.json({ accessToken });
    } catch (err) { res.status(500).json({ msg: err.message }) }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      if (!(email || password)) return res.status(502).json({ msg: "Erro faltas de parâmetros!" });

      const user = await Users.findOne({ email });
      if (!user) return res.status(400).json({ msg: "Este usuário não existe!" });

      // verificar password esta correto
      const passwordConfirm = await bcrypt.compare(password, user.password);
      if (!passwordConfirm) return res.status(400).json({ msg: "Email ou senha incorretos!" });

      // tokens
      const accessToken = createToken({ id: user._id })
      const refreshToken = createRefreshToken({ id: user._id })

      res.cookie('refresh', refreshToken, {
        httpOnly: true,
        path: '/api/access/refresh'
      })

      return res.json({ accessToken })
    } catch (err) { res.status(500).json({ msg: err.message }) }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie('refresh', { path: '/api/access/refresh' })

      return res.json({ msg: "Logout!" })
    } catch (err) { res.status(500).json({ msg: err.message }) }
  },
  refreshToken: async (req, res) => {
    try {
      const refToken = req.cookies.refresh;
      if (!refToken) return res.status(400).json({ msg: "Por favor realize o login ou se cadastre!" })

      jwt.verify(refToken, process.env.REFRESH, (err, user) => {
        if (err) return res.status(400).json({ msg: "Por favor realize o login ou se cadastre! - 2" });

        const accessToken = createToken({ id: user.id })
        res.json({ accessToken })
      })
    } catch (err) { res.status(500).json({ msg: err.message }) }
  },
  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("-password")
      if(!user) return res.status(400).json({ msg: "Usuário não existe!" })

      res.json(user)
    } catch (err) { res.status(500).json({ msg: err.message }) }
  }
}

// tokens
const createToken = user => jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: "11m" });

const createRefreshToken = user => jwt.sign(user, process.env.REFRESH, { expiresIn: "7d" });

module.exports = userCtrl;