const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path')
require('dotenv').config();
const router = express.Router();
const optionsCors = {
    origin: 'https://svisni-sushi.ru',
    optionsSuccessStatus: 200,
    // preflightContinue: false
};

const app = express();

// app middlewares
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
// app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(router)
app.use(cors(optionsCors));

// middlewares
const {orderCheck} = require("./middlewares/orders");

// Controllers
const {createOrPushUserOrder} = require("./controllers/orders");

router.get("/", (req, res) => {
    res.sendStatus(200)
    res.send("This is a sample express app");
});

router.post("/", orderCheck, createOrPushUserOrder);
const PORT = process.env.PORT || 8000;
app.listen(PORT);






// const express = require('express');
// const cors = require('cors');
// const morgan = require('morgan');
// const bodyParser = require('body-parser');
// const path = require('path')
// require('dotenv').config();
//
// const optionsCors = {
//     origin: 'https://svisni-sushi.ru',
//     optionsSuccessStatus: 200,
//     preflightContinue: false
// };
//
// const app = express();
//
// // app middlewares
// app.use(express.static(__dirname + "/public"));
// // app.use(express.urlencoded({ extended: true }));
// app.use(morgan('dev'));
// app.use(bodyParser.json());
// app.use(cors(optionsCors));
//
// // middlewares
// const {orderCheck} = require("./middlewares/orders");
//
// // Controllers
// const {createOrPushUserOrder} = require("./controllers/orders");
//
//
//
// app.get('/', (req, res) => {
//     res.send("This is a sample express app");
// });
//
// app.post("/", orderCheck, createOrPushUserOrder);
// const PORT = process.env.PORT || 3000;
// app.listen(PORT);
//
// // res.status(200);
// // res.sendFile(path.join(__dirname, 'views', 'index.html'))