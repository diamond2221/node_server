const fs = require("fs");

module.exports = async (req, res) => {
    const data = await fs.readFileSync("./data/getcitylist.json");
    const result = new Buffer(JSON.parse(JSON.stringify(data))).toString();
    res.send(
        Math.random() > 0.01
            ? result
            : { code: 404, data: {}, msg: "数据请求失败" }
    );
};
