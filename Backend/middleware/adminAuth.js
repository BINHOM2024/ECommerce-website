import jwt from "jsonwebtoken";
const adminAuth = (req, res, next) => {
  const token = req.headers.token;
  try {
    if (!token)
      return res.json({
        success: false,
        message: "admin not authenticated.",
      });
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD)
      return res.json({
        success: false,
        message: "admin not authenticated.",
      });
    next();
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
export default adminAuth;
