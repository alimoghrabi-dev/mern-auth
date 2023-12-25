import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export function name(req, res) {
  res.send({
    message: "API is up and running",
  });
}

export async function updateUser(req, res, next) {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(403, "You can update only your account"));
  }

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username ? req.body.username : req.user.username,
          email: req.body.email ? req.body.email : req.user.email,
          password: req.body.password ? req.body.password : req.user.password,
          profilePic: req.body.profilePic
            ? req.body.profilePic
            : req.user.profilePic,
        },
      },
      { new: true }
    );

    const { password, ...others } = updatedUser._doc;

    res.status(200).json(others);
  } catch (error) {
    next(error);
  }
}
