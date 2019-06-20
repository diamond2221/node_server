const axios = require("axios");
const qs = require("querystring");

module.exports = async (req, res) => {
  // console.log(req.body);
  // const { code } = req.body;
  const code = "08115KKN0L1eUa2yfRMN0QZCKN015KKk";
  const appid = "wxe812e5fa4ea4f9bf";
  const secret = "";
  const result = await axios.get(
    `https://api.weixin.qq.com/sns/jscode2session`,
    {
      params: {
        appid,
        secret,
        js_code: code,
        grant_type: "authorization_code"
      }
    }
  );
  res.send(result.data);
};
