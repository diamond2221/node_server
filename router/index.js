const getcar = require("./api/getcar/index.js");
const getcars = require("./api/getcars/index.js");
const getcitylist = require("./api/getcitylist/index.js");
const uploadFile = require("./api/uploadFile/index.js");

const proItemGet = require("./api/tbk/item_get/item.js");

const mycollection = require("./api/collection/addcollection.js");

const login = require("./api/login/index.js");

const auth = require("./api/auth/index.js");

module.exports = router => {
    /* 上传图片 */
    router.post("/files/uploadfile", uploadFile);
    /* 上传图片 */

    /* 河马新车 Mobile 首页 */
    router.get("/getcar", getcar);
    router.get("/getcars", getcars);
    router.get("/getcitylist", getcitylist);
    /* 河马新车 Mobile 首页 */

    /* 淘宝客商品查询 */
    router.get("/proItemGet", proItemGet);
    /* 淘宝客商品查询 */

    /* 河马新车 获取我的收藏 */
    router.get("/collection/mycollection", mycollection);

    /* 小程序登录 */
    router.post("/login", login);

    /* 解密授权数据 */
    router.get("/auth", auth)
};
