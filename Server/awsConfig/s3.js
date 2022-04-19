const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");

const s3 = new S3({
  region: process.env.AWS_BUCKET_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

exports.uploadFile = (file, outletName) => {
  const image = Object.values(file);
  let array = [];
  image.map((image) => array.push(image[0]));
  //console.log("s3", array);
  array.forEach((el, i) => {
    let fileStream = fs.createReadStream(el.path);

    let uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME + "/" + outletName,
      Body: fileStream,
      Key: el.filename,
    };
    return s3.upload(uploadParams).promise();
  });
};
