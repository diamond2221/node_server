const axios = require("axios");

module.exports = async (req, res) => {
    const result = await axios.get("https://gw.api.tbsandbox.com/router/rest", {
        params: {
            format: "json",
            method: "taobao.tbk.item.get",
            version: 2.0
        }
    });
    console.log(result.data);
    res.send({ errno: 0, data: result.data });
};
