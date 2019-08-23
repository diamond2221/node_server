module.exports = (req, res) => {
    // console.log(req.body);
    res.send({
        errno: 0,
        data: new Array(500).fill(0).map((item, index) => {
            return {
                title: `标题${index + 1}`,
                content: `这是内容${index + 1}这是内容${index +
                    1}这是内容${index + 1}`
            };
        })
    });
};
