const keys = require('./keys');
const express = require('express');
const nodemailer = require('nodemailer');
const sendgrid = require('nodemailer-sendgrid-transport');
const payEmail = require('./emails/sussefulPay');
const path = require('path');
const formData = require("express-form-data");
const os = require("os");
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const app = express();

// const router = express.Router()
// app.use(express.urlencoded({ extended: true }))

const mailer = nodemailer.createTransport(sendgrid({
    auth: { api_key: keys.SENDGRID_API_KEY }
}));

const options = {
    uploadDir: os.tmpdir(),
    autoClean: true
};

app.use(express.static(__dirname + "/public"));
app.use(formData.parse(options));
app.use(formData.format());
app.use(formData.stream());
app.use(formData.union());

app.get('/', (req, res) => {
    res.status(200);
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
});

const optionsCors = {
    origin: 'https://svisni-sushi.ru/',
    optionsSuccessStatus: 200,
    preflightContinue: false,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

app.post("/", cors(optionsCors), async (req, res) => {
    // console.log(req.body);
    await mailer.sendMail(payEmail("Новый заказ", req.body));
    // res.redirect('/')
    res.end()
});

app.listen(PORT);