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
  "toggles": {
  }
};

module.exports = CONFIG;
