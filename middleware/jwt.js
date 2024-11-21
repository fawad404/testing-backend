import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  console.log("Token:", token); 
  if (!token) return next(createError(401, "User not authenticated!"));
  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return next(createError(403, "Invalid access token"));
    req.userId = payload.id;
    req.isSeller = payload.isSeller;
    next();
  });
};
