const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log('Authorization Header:', authHeader); // Log header

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'Authentication failed. Token not provided or invalid format.',
        success: false,
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded); // Log decoded token

    req.user = {
      id: decoded.id,
      // other user properties you may need
    };

    next();
  } catch (error) {
    console.error('Auth Middleware Error:', error);
    res.status(401).json({
      message: 'Authentication failed',
      success: false,
    });
  }
};

/*

const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(200).send({
          message: "Auth Fialed",
          success: false,
        });
      } else {
        req.body.userId = decode.id;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "Auth Failed",
      success: false,
    });
  }
};

middlewares/authMiddleware.js
*/
/*
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Ensure this line sets req.user correctly
    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err);
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;*/