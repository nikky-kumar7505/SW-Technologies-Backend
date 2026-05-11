const jwt = require("jsonwebtoken");
const User = require("./models/User");

function signToken(user) {
  return jwt.sign({ sub: String(user._id), isAdmin: !!user.isAdmin }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

function authRequired(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.auth = payload;
    return next();
  } catch {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

function adminRequired(req, res, next) {
  authRequired(req, res, async () => {
    if (!req.auth?.sub) return res.status(401).json({ message: "Unauthorized" });
    const user = await User.findById(req.auth.sub).select("isAdmin").lean();
    if (!user?.isAdmin) return res.status(401).json({ message: "Unauthorized" });
    return next();
  });
}

module.exports = { signToken, authRequired, adminRequired };

