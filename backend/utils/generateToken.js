// utils/generateToken.js
import jwt from "jsonwebtoken";

const generateToken = (id, role) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  return jwt.sign(
    { id, role },                        // id + role token me
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

export default generateToken;
