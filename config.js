var CONFIG = {
  "DB": {
    "URL": process.env.MONGO_DB || "mongodb://localhost/thoughtbnb"
  },
  "SECRET": process.env.SECRET || "wereinthecloud",
  "EMAIL_DOMAIN": process.env.EMAIL_DOMAIN || "thoughtbnb.com",
  "EMAIL_TRANSPORT": process.env.EMAIL_TRANSPORT || "direct",
  "MANDRILL_KEY": process.env.MANDRILL_KEY || "getyourownkey",
  "MAILTRAP_USER": process.env.EMAIL_USER || "youneedyourownuser",
  "MAILTRAP_PASSWORD": process.env.EMAIL_PASSWORD || "youneedyourownpw",
  "MAILTRAP_PORT": process.env.MAILTRAP_PORT || 2525,
  "USE_LOCAL_ASSETS": process.env.USE_LOCAL_ASSETS || false,
  "GMAPKEY": process.env.GMAPKEY || "getyourownkey",
  "salt": process.env.SALT || "a3jcLj3kaB",
  "AWS_S3_ENDPOINT": process.env.AWS_S3_URL || "192.168.33.15",
  "S3_BUCKET": process.env.S3_BUCKET || "thoughtbnb",
  "AWS_ACCESS_KEY_ID": process.env.AWS_ACCESS_KEY_ID || "findyourawskey",
  "AWS_SECRET_ACCESS_KEY": process.env.AWS_SECRET_ACCESS_KEY || "getyourownawssecret",
  "toggles": {
  }
};

module.exports = CONFIG;
