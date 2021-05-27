const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'randy11@ethereal.email',
    pass: 'C8ve5hMbfZUPxpqRrt'
  }
})

const sendMail = async (email, verifyToken) => {
  const sendedEmail = await transporter.sendMail({
    from: '<no-reply@ethereal.email>',
    to: email,
    subject: 'Email verification',
    text: `Email verification http://localhost:3000/users/verify/${verifyToken}`,
    html: `<b>Email verification: </b><a href='http://localhost:3000/users/verify/${verifyToken}'>Please open the link to confirm your email</>`
  })

  return sendedEmail
}

module.exports = { sendMail }
