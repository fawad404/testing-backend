import User from "../models/user.model.js";
import createError from "../utils/createError.js";

export const deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (req.userId !== user._id.toString()) {
    return next(createError(403, "You can delete only your account!"));
  }
  await User.findByIdAndDelete(req.params.id);
  res.status(200).send("Deleted Sucessfully.");
};

export const getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).send(user);
};


export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();  // Fetch all users
    if (!users) return next(createError(404, "No users found!"));
    res.status(200).json(users);      // Send all users in the response
  } catch (err) {
    next(err);
  }
};
