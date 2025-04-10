const fs = require("fs");
const path = require("path");

// Load user token data
const tokenData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/userToken.json"))
);

const authMiddleware = (req, res, next) => {
  // Extract token from headers first
  const authorization =
    req.headers.authorization ||
    req.body.authorization ||
    req.params.authorization;

  if (!authorization) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const user = tokenData.find((user) => user.token === authorization);

  if (!user) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }

  req.user = user; // Optional: Attach user to request object
  next();
};

module.exports = authMiddleware;
