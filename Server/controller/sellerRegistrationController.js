const { uploadFile } = require("../awsConfig/s3");
const sellerRegistrationModel = require("../Model/sellerRegistrationmodel");

exports.sellerRegistration = async (req, res) => {
  const idGenerator = () => {
    let id = (Date.now() % 10000).toString();
    while (id.length < 4) {
      id = id + Math.floor(Math.random() * 10);
    }
    return id;
  };
  const id = idGenerator();
  try {
    const obj = JSON.parse(req.body.companyrepresentative);
    const obj1 = JSON.parse(req.body.operationhours);
    const sellerRegistrationData = new sellerRegistrationModel({
      outlet_id: id,
      outletinformation: {
        outletName: req.body.outletName,
        outletCompleteAddress: req.body.outletCompleteAddress,
        outletPincode: req.body.outletPincode,
        outletcity: req.body.outletcity,
        outletCountry: req.body.outletCountry,
        pinOutletAddress: req.body.pinOutletAddress,
        contactNumberOfOutlet: req.body.contactNumberOfOutlet,
        emailOfOutlet: req.body.emailOfOutlet,
        type: req.body.type,
        category: req.body.category,
        establishment: req.body.establishment,
        typeofcusine: req.body.typeofcusine,
        operationhours: {
          time: obj1.time,
          days: obj1.days,
        },
        companyrepresentative: {
          employeename: obj.employeename,
          employeeid: obj.employeeid,
        },
      },
      ownerdetails: {
        outletownernumber: req.body.outletownernumber,
        ouletownername: req.body.ouletownername,
        outletowneremailaddress: req.body.outletowneremailaddress,
        pannumber: req.body.pannumber,
        ownerfulladdress: req.body.ownerfulladdress,
        adhharcardnumber: req.body.adhharcardnumber,
      },
      officialdetails: {
        fssaicertificate: req.body.fssaicertificate,
        gstinnumber: req.body.gstinnumber,
        accountnumber: req.body.accountnumber,
        bankname: req.body.bankname,
        accounttype: req.body.accounttype,
        accountholdername: req.body.accountholdername,
        confirmaccountnumber: req.body.confirmaccountnumber,
        IFSCcode: req.body.IFSCcode,
        MMID: req.body.MMID,
      },
      products: req.body.products,
      globaldishdiscount: req.body.globaldishdiscount,
      globaldishdiscountpercentage: req.body.globaldishdiscountpercentage,
      admin_status: req.body.admin_status,
      active: req.body.active,
    });
    await sellerRegistrationData.save();
    if (req.files) {
      console.log(req.files);
      uploadFile(req.files, id);
      res.status(200).send("uploaded");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
