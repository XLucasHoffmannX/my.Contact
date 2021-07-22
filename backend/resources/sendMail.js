const router = require('express').Router();
const nodemailer = require('nodemailer');
const ejs = require('ejs')

router.post('/sendMail', (req, res) => {
  const {emailTo} = req.body;
  try {
    if(!emailTo) return res.status(400).json({ msg: "Falta de parâmetros!" }) 
    ejs.renderFile(__dirname + "/emailTemplate.ejs", (err, data) => {
      if (err) return res.status(400).json(err);
      let transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "8a7481462117b2",
          pass: "4fc9ea3f4f36e1"
        }
      });
      let mailOptions = {
        from: "noreply.mycontact@mct.com",
        to: `${emailTo}`,
        subject: "Email com html",
        html: data
      }

      transport.sendMail(mailOptions, (err, info) => {
        if (err) return res.status(400).json(err);
        console.log("Mesagem enviada!")
      })
    })

    res.json({ msg: "Enviado com sucesso!" })
  } catch (error) { return res.status(500).json(error) }

})

module.exports = router;