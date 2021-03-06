var aws = require('aws-sdk');
var shortid = require('shortid');
var CONFIG = require('../config');
var sanitize = require("sanitize-filename");

module.exports = function(userID, filename){
  var self = this;
  var s3 = new aws.S3({
      accessKeyId: CONFIG.AWS_ACCESS_KEY_ID,
      secretAccessKey: CONFIG.AWS_SECRET_ACCESS_KEY,
      endpoint: CONFIG.AWS_S3_ENDPOINT,
      sslEnabled: false,
      s3ForcePathStyle: true,
  });
  self.getS3SignedURL = function(callback) {
    var s3Params = {
      Bucket: CONFIG.S3_BUCKET,
      Key: userID + '/'+ shortid.generate() + "-" + sanitize(filename),
      Expires: 60,
      ContentType: 'image/*',
      ACL: 'public-read'
    };
    s3.getSignedUrl('putObject', s3Params, function(err, data) {
      if(err){
        console.log(err);
        return err;
      }

      var returnData = {
        signedRequest: data,
        url: "http://" + CONFIG.AWS_S3_ENDPOINT +"/" + CONFIG.S3_BUCKET + "/" + userID + "/" + filename
      };
      return callback(JSON.stringify(returnData));
    });
  };
return this;
};
