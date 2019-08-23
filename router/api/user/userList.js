const connection = require("../../../utils/db.js");
module.exports = (req, res) => {
  connection.connect();
  const sql = "select * from students where id>1 limit 3";
  connection.query(sql, (error, result, fields) => {
    if (error) {
      res.send({
        errno: 1,
        msg: "数据库查询出错"
      })
      return console.log(error);
    }
    // console.log(result, fields);
    console.log(JSON.parse(JSON.stringify(result)))
    res.send({
      errno: 0,
      data: result
    })
    // connection.end();
  });
};
