const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET; // Ensure you have your secret key in your environment variables

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401); // If there is no token, return Unauthorized

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // If the token is invalid, return Forbidden
    req.user = user; // Attach the user object to the request
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = authenticateToken;
