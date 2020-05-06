const jwt = require("jsonwebtoken");

const authorize = (req, res, next) => {
  const token = req.header("x-auth-token"); //front end bata header ma x-auth-token vanera token aunxa
  if (!token) res.status(401).json("Access Denied");
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    //decoded - _id,email,iat
    if (err) {
      console.log("verifyTokenError", err.response);
      res.status(400).json(err);
    } else {
      req.user = decoded;
      next();
    }
  });
};
module.exports = authorize;
