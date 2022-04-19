const typeModel = require("../Model/typeModel");

exports.getType = (req, res) => {
  const data = typeModel.find({});
  res.send(data);
};

exports.postType = async (req, res) => {
  try {
    const typeData = new typeModel({
      dishType: req.body.dishType,
    });
    await typeData.save();
  } catch (error) {
    res.send(error);
  }
};
