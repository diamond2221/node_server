const WXBizDataCrypt = require("../../../utils/WXBizDataCrypt.js");

module.exports = async (req, res) => {
  // const { appid, sessionKey, encryptedData, iv } = req.body;
  const appid = "wxe812e5fa4ea4f9bf";

  const encryptedData = `MSXEWXQZZgcXFk6Z8sT/kw0i02svP5FKZQSTB24O3Wp5WlrpRiCJGsaQKTdUQ0j6So4UWLu5CzjiagYngEYv0krCbibljGbUYs9EM5F9k/KuzIPeOP38paMmmCILA2C9UIVK+JiKnF2hyP0BCn8oDb5l0CIlXRalsXDwxgTHqglQOwLbonrpm8lwGasT3pF1/Xk/p8G2HvCklwdX/Y/R8w==`;
  const iv = "J+xGCL8ur2WBinIvULVTuQ==";
  const sessionkey = "twnl9aw76uXzKs8OThtp3w==";
  var pc = new WXBizDataCrypt(appid, sessionkey);
  var data = pc.decryptData(encryptedData, iv);

  res.send(data);
};
