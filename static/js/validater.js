//var validater = {
//  //检验手机号的正则表达式;
//  checkMobileReg:function(params){
//      var reg = /^1[3|4|5|6|8|7|9][0-9]\d{8}$/;
//
//      //返回布尔值
//      return reg.test(params);
//  },
//
//  //去除字符串中间的空(用空格替换空);
//  devarSpaceInStr:function(params){
//      var paramsStr = params.replace(/\s/g, "");
//      return paramsStr;
//  }
//};
function checkMobileReg(params) {
    var reg = /^1[3|4|5|6|8|7|9][0-9]\d{8}$/;
    //返回布尔值
    return reg.test(params);
}
function devarSpaceInStr(params) {
    var paramsStr = params.replace(/\s/g, "");
    return paramsStr;
}

//验证是否为车牌号码,
function checkCarCardReg(params) {
    //  验证车牌号
    var reg = /^[\u4e00-\u9fa5]{1}[a-zA-Z]{1}[a-zA-Z_0-9]{4}[a-zA-Z_0-9_\u4e00-\u9fa5]$|^[a-zA-Z]{2}\d{7}$ /;
    return reg.test(params);
}
