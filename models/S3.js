const aws = require('aws-sdk');
require('aws-sdk');

module.exports = function(filename){
  var self = this;
  const s3 = new aws.S3();

  self.getS3SignedURL = function(callback) {
    var s3Params = {
      Bucket: 'thoughtbnb',
      Key: filename,
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
        url: `https://thoughtbnb.s3.amazonaws.com/${filename}`
      };
      return callback(JSON.stringify(returnData));
    });
  };
return this;
};
