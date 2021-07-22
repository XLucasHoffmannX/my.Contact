const jwt = require('jsonwebtoken');

const auth = (req, res, next)=>{
  try {
    const token = req.header("Authorization");
    if(!token) return res.status(400).json({ msg: "Autenticação inválida!" })

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user)=>{
      if(err) return res.status(400).json({ msg: "Token expirou!" });

      req.user = user;
      next();
    })
  } catch (err) { res.status(500).json({ msg: err.message }) }
}

module.exports = auth;