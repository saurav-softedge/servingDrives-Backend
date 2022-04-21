const typeModel = require("../Model/typeModel");

const typeofcuisines = () => [
  "Indian Fodd",
  "Chinese Food",
  "Italian Food",
  "Mexican Food",
  "Swedish Food",
  "Latvian Food",
  "Italian Food",
  "Spanish Food",
  "American Food",
  "Scottish Food",
  "British Food",
  "Thai Food",
  "Japanese Food",
  "Canadian Food",
  "Russian Food",
  "Jewish Food",
  "Polish Food",
  "German Food",
  "French Food",
  "Hawaiian Food",
  "Brazilian Food",
  "Peruvian Food",
  "Salvadorian Food",
  "Cuban Food",
  "Tibetan Food",
  "Egyptian Food",
  "Greek Food",
  "Belgian Foods",
  "Irish Food",
  "Welsh Food",
  "Mormon Food",
  "Cajun Food",
  "Portuguese Food",
  "Turkish Food",
  "Haitian Food",
  "Tahitian Food",
  "Kenyan Food",
  "Korean Food",
  "Algerian Food",
  "Nigerian Food",
  "Libyan Food",
];

exports.getType = async (req, res) => {
  const data = await typeModel.find();
  res.status(200).send(data[0].dishType);
};

exports.postType = async (req, res) => {
  console.log(req.body);
  try {
    const typeData = new typeModel({
      dishType: typeofcuisines(),
    });
    typeData.save().then((data) => res.status(200).status(200).send(data));
  } catch (error) {
    res.status(500).send(error);
  }
};
