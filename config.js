var CONFIG = {
  "DB": {
    "URL": process.env.MONGO_DB || "mongodb://localhost/thoughtbnb"
  },
  "SECRET": process.env.SECRET || "wereinthecloud",
  "EMAIL_DOMAIN": process.env.EMAIL_DOMAIN || "thoughtbnb.com",
  "USE_LOCAL_ASSETS": process.env.USE_LOCAL_ASSETS || false,
  "GMAPKEY": process.env.GMAPKEY || "getyourownkey",
  "salt": process.env.SALT || "a3jcLj3kaB",
  "toggles": {
    "googlelocationsearch": process.env.USEGPLACESEARCH || false
  }
};

module.exports = CONFIG;
