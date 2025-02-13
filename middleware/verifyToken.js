import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  // Memisahkan 'Bearer ' dan token yang sebenarnya
  const tokenWithoutBearer = token.split(" ")[1];

  if (!tokenWithoutBearer) {
    return res.status(403).json({ message: "Token format is incorrect" });
  }

  jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.userId = decoded.id; // Menyimpan decoded.id ke dalam request
    next(); // Melanjutkan ke handler berikutnya
  });
};

export default verifyToken;
