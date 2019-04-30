const formmidlable = require("formidable");

module.exports = async (req, res) => {
    const form = new formmidlable.IncomingForm();
    form.parse(req, (err, text, file) => {
        console.log(file.files);
    });
    res.send("ok");
};
