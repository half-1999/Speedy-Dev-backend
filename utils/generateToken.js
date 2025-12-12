import jwt from "jsonwebtoken";

export const generateToken = (res, user, message) => {
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: true, // REQUIRED for SameSite=None
    sameSite: "None", // cross-site cookie support
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    path: "/", // ensure cookie accessible for all routes
  });

  return res.status(200).json({
    success: true,
    message,
    user,
    token, // also return for localStorage
  });
};
