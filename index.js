const express = require('express');
const cors = require('cors');
// const bodyParser = require('body-parser');

const app = express();
const port = 3000; // default port to listen

// middlewares
const { orderCheck } = require("./middlewares/orders");

// Controllers
const { createOrPushUserOrder } = require("./controllers/orders");

const optionsCors = {
  origin: "*",
  // origin: "https://svisni-sushi.ru",
  allowedHeaders: "Origin,X-Requested-With,Content-Type,Accept",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200
};

app.use(cors(optionsCors));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
// app.use(bodyParser.urlencoded({
//   extended: true
// }));

app.get('/', (req, res) => {
//   const randomId = `${Math.random()}`.slice(2);
//   const path = `/api/item/${randomId}`;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(`Hello! Go to`);
});

app.post("/", orderCheck, createOrPushUserOrder);

// start the express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});

module.exports = app;


// const express = require('express');
// const cors = require('cors');
// const morgan = require('morgan');
// const bodyParser = require('body-parser');
// // const path = require('path')
// require('dotenv').config();

// const router = express.Router();

// const optionsCors = {
//     origin: "https://svisni-sushi.ru",
//     allowedHeaders: "Origin,X-Requested-With,Content-Type,Accept",
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     optionsSuccessStatus: 200
// };

// const app = express();

// // app middlewares
// // app.use(express.static(__dirname + "/public"));
// app.use(express.urlencoded({ extended: true }));
// // app.use(morgan('dev'));
// app.use(bodyParser.json());
// app.use(router)
// app.use(cors(optionsCors));

// // middlewares
// const { orderCheck } = require("./middlewares/orders");

// // Controllers
// const { createOrPushUserOrder } = require("./controllers/orders");

// app.get("/", (req, res) => {
//     res.sendStatus(200)
//     res.send("This is a sample express app");
// });

// app.post("/", orderCheck, createOrPushUserOrder);

// const PORT = process.env.PORT || 8000;
// app.listen(PORT);

// module.exports = app;
