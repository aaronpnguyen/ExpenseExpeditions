const jwt = require("jsonwebtoken");
 
module.exports.authenticate = (request, response, next) => {
  jwt.verify(request.cookies.usertoken, process.env.SECRET_KEY, (error, payload) => {
    if (error) response.status(401).json({verified: false});
    else next();
  });
}