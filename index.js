const keys = require('./keys')
const express = require('express')
const nodemailer = require('nodemailer')
const sendgrid = require('nodemailer-sendgrid-transport')
const payEmail = require('./emails/sussefulPay')
const path = require('path')
const PORT = process.env.PORT || 3000
const app = express()

// const router = express.Router()

const mailer = nodemailer.createTransport(sendgrid({
    auth: {api_key: keys.SENDGRID_API_KEY}
}))

app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.status(200)
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contact.html'))
})

app.post("/", async (req, res) => {
    await mailer.sendMail(payEmail(req.body.subject, req.body.message))
    res.redirect('/')
})

app.listen(PORT)