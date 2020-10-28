const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();

// middlewares
const {orderCheck} = require("./middlewares/orders");

// Controllers
const {createOrPushUserOrder} = require("./controllers/orders");

const PORT = process.env.PORT || 3000;
const app = express();

const optionsCors = {
    origin: 'https://svisni-sushi.ru',
    optionsSuccessStatus: 200,
    preflightContinue: false
};

// app middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors(optionsCors));
// if(process.env.NODE_ENV === 'development') {
//     app.use(cors({origin: 'http://localhost:8000'}));
// } else {
//     app.use(cors(optionsCors));
// }


app.post("/", orderCheck, createOrPushUserOrder);

app.listen(PORT);
