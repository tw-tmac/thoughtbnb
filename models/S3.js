const aws = require('aws-sdk');
require('aws-sdk');
var CONFIG = require('../config');


module.exports = function(userID, filename){
  var self = this;
  const s3 = new aws.S3({
      accessKeyId: CONFIG.AWS_ACCESS_KEY_ID,
      secretAccessKey: CONFIG.AWS_SECRET_ACCESS_KEY,
      endpoint: CONFIG.AWS_S3_ENDPOINT,
      sslEnabled: false,
      s3ForcePathStyle: true,
  });
  self.getS3SignedURL = function(callback) {
    var s3Params = {
      Bucket: CONFIG.S3_BUCKET,
      Key: userID + '/'+filename,
      Expires: 60,
      ContentType: 'image/*',
      ACL: 'public-read'
    };
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if(err){
        console.log(err);
        return err;
      }

      const returnData = {
        signedRequest: data,
        url: "http://" + CONFIG.AWS_S3_ENDPOINT +"/" + CONFIG.S3_BUCKET + "/" + userID + "/" + filename
      };
      return callback(JSON.stringify(returnData));
    });
  };
return this;
};
