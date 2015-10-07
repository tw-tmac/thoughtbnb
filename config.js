var CONFIG = {
  "DB": {
    "URL": process.env.MONGO_DB || "mongodb://localhost/thoughtbnb"
  },
  "SECRET": process.env.SECRET || "wereinthecloud",
  "EMAIL_DOMAIN": process.env.EMAIL_DOMAIN || "thoughtbnb.com"
};

module.exports = CONFIG;
