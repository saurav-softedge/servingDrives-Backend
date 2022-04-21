const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

const validateContactNumber = (val) => {
  const re = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
  return re.test(val);
};

const vaidatePanNumber = (val) => {
  const re = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
  return re.test(val);
};

const validatePinNumber = (val) => {
  const re = /^[1-9][0-9]{5}$/;
  return re.test(val);
};

const validateAadhaarNumber = (val) => {
  const re = /^[2-9]{4}[ -]?[0-9]{4}[ -]?[0-9]{4}$/;
  return re.test(val);
};

const validateFssaiNumber = (val) => {
  const re =
    /^[1-2]{1}[ -]?[0-3]{1}[0-9]{1}[ -]?[0-9]{2}[ -]?[0-9]{3}[ -]?[0-9]{6}$/;
  return re.test(val);
};

const validateGSTNumber = (val) => {
  const re = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  return re.test(val);
};

const validateIFSCCode = (val) => {
  const re = /^[A-Za-z]{4}0[A-Z0-9a-z]{6}$/;
  return re.test(val);
};
// const daysSchema = new Schema({ day: String });

const outletSchema = new Schema({
  outlet_id: String,
  outletinformation: {
    outletName: {
      required: true,
      type: String,
    },
    outletCompleteAddress: {
      required: true,
      type: String,
    },
    outletPincode: {
      type: Number,
      validate: [validatePinNumber, "Invalid Pin Code"],
      match: [/^[1-9][0-9]{5}$/, "Invalid Pin Code"],
    },
    outletcity: {
      type: String,
      default: "jaipur",
    },
    outletCountry: {
      type: String,
    },
    pinOutletAddress: {
      required: true,
      type: Number,
      validate: [validatePinNumber, "Invalid Pin Code"],
      match: [/^[1-9][0-9]{5}$/, "Invalid Pin Code"],
    },
    contactNumberOfOutlet: {
      required: true,
      type: Number,
      validate: [validateContactNumber, "Invalid Conatct Number"],
      match: [/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/, "Invalid Conatct Number"],
    },
    emailOfOutlet: {
      type: String,
      trim: true,
      lowercase: true,
      validate(v) {
        if (!validator.isEmail(v)) {
          throw new Error("Please enter a valid Email");
        }
      },
    },
    type: {
      required: true,
      type: String,
      enum: {
        values: ["grocery", "restaurant"],
        message: "Only grocery and restaurant are valid",
      },
    },
    category: {
      type: String,
      enum: {
        values: [
          "bakery",
          "ice cream parlour",
          "sweet shop",
          "juice parlour",
          "cafe",
          "restaurant",
          "quick bites",
          "paan parlour",
        ],
        message: "Provide valid values",
      },
    },
    establishment: {
      required: true,
      type: String,
      enum: {
        values: ["drive in", "delivery"],
        message: "Only drive in and delivery are valid",
      },
    },
    typeofcusine: {
      required: true,
      type: String,
    },
    operationhours: {
      time: {
        type: Number,
      },
      days: [String],
    },
    companyrepresentative: {
      employeename: {
        type: String,
      },
      employeeid: {
        type: String,
      },
    },
  },
  ownerdetails: {
    outletownernumber: {
      required: true,
      type: Number,
      validate: [validateContactNumber, "Invalid Conatct Number"],
      match: [/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/, "Invalid Conatct Number"],
    },
    ouletownername: {
      type: String,
      required: true,
    },
    outletowneremailaddress: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(v) {
        if (!validator.isEmail(v)) {
          throw new Error("Please enter a valid Email");
        }
      },
    },
    pannumber: {
      type: String,
      required: true,
      validate: [vaidatePanNumber, "Inavalid PAN Number"],
      match: [/([A-Z]){5}([0-9]){4}([A-Z]){1}$/, "Inavalid PAN Number"],
    },
    ownerfulladdress: {
      required: true,
      type: String,
    },
    adhharcardnumber: {
      type: String,
      required: true,
      validate: [validateAadhaarNumber, "Invalid Aadhaar Number"],
      match: [/^[2-9]{4}[ -]?[0-9]{4}[ -]?[0-9]{4}$/, "Invalid Aadhaar Number"],
    },
  },
  officialdetails: {
    fssaicertificate: {
      type: Number,
      required: [true, "require fssai certificate number"],
      validate: [validateFssaiNumber, "invalid fssai certificate number"],
      match: [
        /^[1-2]{1}[ -]?[0-3]{1}[0-9]{1}[ -]?[0-9]{2}[ -]?[0-9]{3}[ -]?[0-9]{6}$/,
        "invalid fssai certificate number",
      ],
    },
    gstinnumber: {
      type: String,
      required: [true, "GSTIN number is required"],
      validate: [validateGSTNumber, "Invalid GST Number"],
      match: [
        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
        "Invalid GST Number",
      ],
    },
    accountnumber: {
      type: String,
      required: [true, "account number is required"],
    },
    bankname: {
      type: String,
      required: [true, "Please provide bank name"],
    },
    accounttype: {
      type: String,
      required: [true, "Account type is required"],
    },
    accountholdername: {
      type: String,
      required: [true, "Account holder name is required"],
    },
    confirmaccountnumber: {
      type: String,
      required: [true, "Confirm account number is required"],
    },
    IFSCcode: {
      type: String,
      required: [true, "IFSC Code is required"],
      validate: [validateIFSCCode, "Invalid IFSC Code"],
      match: [/^[A-Za-z]{4}0[A-Z0-9a-z]{6}$/, "Invalid IFSC Code"],
    },
    MMID: {
      type: String,
      required: [true, "MMID is required"],
    },
  },
  products: {
    type: [String],
    default: null,
  },
  globaldishdiscount: {
    type: String,
    // enum: {
    //   values: ["Yes", "No"],
    //   message: "Only two values Yes and No are allowed",
    // },
  },
  globaldishdiscountpercentage: String,
  opening_status: {
    type: String,
    // enum: {
    //   values: ["Active", "Inactive"],
    //   message: "Only Active and Inactive status are allowed for opening status",
    // },
  },
  admin_status: {
    type: String,
    // enum: {
    //   values: ["Approved", "Not Approved"],
    //   message:
    //     "Only values Approved and Not Approved are allowed in admin status",
    // },
  },
  active: {
    type: String,
    // enum: {
    //   values: ["Yes", "No"],
    //   message: "Active Status can only take values Yes or No",
    // },
    default: null,
  },
});

const sellerRegistrationModel = mongoose.model(
  "outletregistrations",
  outletSchema
);

module.exports = sellerRegistrationModel;
