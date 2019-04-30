const getcar = require("./api/getcar/index.js");
const getcars = require("./api/getcars/index.js");
const getcitylist = require("./api/getcitylist/index.js");
const uploadFile = require("./api/uploadFile/index.js");

module.exports = router => {
    /* 上传图片 */
    router.post("/files/uploadfile", uploadFile);
    /* 上传图片 */

    /* 河马新车 Mobile 首页 */
    router.get("/getcar", getcar);
    router.get("/getcars", getcars);
    router.get("/getcitylist", getcitylist);
    /* 河马新车 Mobile 首页 */
};
