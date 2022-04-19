const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const typeSchema = new Schema({
  dishType: [String],
});

const typeModel = mongoose.model("Type", typeSchema);

module.exports = typeModel;
