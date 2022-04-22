const sellerRegistrationModel = require("../Model/sellerRegistrationmodel");

exports.adminOutletList = async (req, res) => {
  try {
    const data = await sellerRegistrationModel.find();
    const element = [];
    for (let index = 0; index < data.length; index++) {
      element.push({
        outletId: data[index].outlet_id,
        outletName: data[index].outletinformation.outletName,
      });
    }
    res.status(200).json({ data: element });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.adminOutletApprove = async (req, res) => {
  try {
    let { outlet_id, admin_status } = req.body;
    const ouletRecords = await sellerRegistrationModel.find({ outlet_id });
    if (ouletRecords.length === 1) {
      await sellerRegistrationModel.updateOne(
        { outlet_id },
        { admin_status: admin_status }
      );
      res.status(200).json({ message: "updated Status" });
    } else {
      throw Error("The outlet Id is Invalid");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.adminOutletActive = async (req, res) => {
  try {
    let { outlet_id, active } = req.body;
    const ouletRecords = await sellerRegistrationModel.find({ outlet_id });
    if (ouletRecords.length === 1) {
      await sellerRegistrationModel.updateOne(
        { outlet_id },
        { active: active }
      );
      res.status(200).json({ message: "updated Active Status" });
    } else {
      throw Error("The outlet is not present");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
