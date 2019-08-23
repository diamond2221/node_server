const express = require("express");
const app = express();
const router = new express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");
const HttpPort = 3000;
const expression = require("compression");
const history = require("connect-history-api-fallback");

// 路由集合
const route = require("../router/index.js")(router);


// app.use(history());
app.use(expression());
// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);
app.use(express.static("./static"));
app.listen(HttpPort, () => console.log(HttpPort + " 端口启动"));

module.exports = app;
