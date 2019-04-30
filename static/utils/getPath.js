const fs = require("fs");
const path = require("path");
const filePath = path.resolve(__dirname, "../src/js");

// const files = fs.readdirSync(path.resolve(__dirname, "src"));
const files = fs.readdirSync(filePath);

let entries = {},
    nameArr,
    name,
    pathName;

files.forEach(item => {
    if (!fs.lstatSync(path.resolve(filePath, item)).isDirectory()) {
        nameArr = item.split(".");
        nameArr.pop();
        name = nameArr.join(".");
        pathName = "./src/js/" + item;
        entries = {
            ...entries,
            ...{
                [name]: pathName
            }
        };
    }
});
module.exports = entries;
