const express = require("express");
const app = express();
const router = new express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const HttpPort = 8081;
const expression = require("compression");
const history = require("connect-history-api-fallback");

const formmidlable = require("formidable");

const fs = require("fs");

/* 河马新车 mobile */
router.get("/getcars", async (req, res) => {
    const data = await fs.readFileSync("./data/getcars.json");
    const result = new Buffer(JSON.parse(JSON.stringify(data))).toString();
    res.send(
        Math.random() > 0.01
            ? result
            : { code: 404, data: {}, msg: "数据请求失败" }
    );
});
router.get("/getcar", async (req, res) => {
    const data = await fs.readFileSync("./data/getcar.json");
    const result = new Buffer(JSON.parse(JSON.stringify(data))).toString();
    res.send(
        Math.random() > 0.01
            ? result
            : { code: 404, data: {}, msg: "数据请求失败" }
    );
});
/* 河马新车 mobile */

router.get("/api/test", (req, res) => {
    const { title = "home" } = req.query;
    res.send({
        errno: 0,
        data: {
            num: req.query.num
        }
    });
    return;
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
        <title>${title}</title>
    </head>
    <body>
        <h1>Home Page</h1>
    </body>
    </html>`);
});

router.get("/test", (req, res) => {
    const { query } = req;
    // setTimeout(() => {
    res.send({
        data: {
            ...query
        },
        errno: 0
    });
    // }, 2200);
});
router.post("/testpost", async (req, res) => {
    const { body } = req;
    console.log(res);
    // console.log(body, req.url);
    const { data } = await axios.get(
        "http://127.0.0.1:8080/test?name=zhangsan"
    );
    // setTimeout(() => {
    res.send({
        errno: 0,
        data: {
            ...body,
            ...data.data
        },
        message: "成功"
    });
    console.log(data);
    // }, 1500);
});

router.post("/submitMessage", (req, res) => {
    // console.log(req.body);
    let num = parseInt(Math.random() * 3) + 1;
    res.send({
        errno: 0,
        data: {
            num,
            ...req.body
        }
    });
});

router.post("/files/uploadfile", async (req, res) => {
    const form = new formmidlable.IncomingForm();
    form.parse(req, (err, text, file) => {
        // console.log(err, text, file)
        console.log(file.files);
    });
    res.send("ok");
});
// app.use(history());
app.use(expression());
// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);
// app.use(express.static("./static"));
app.listen(HttpPort, () => console.log(HttpPort + " 端口启动"));

module.exports = app;
