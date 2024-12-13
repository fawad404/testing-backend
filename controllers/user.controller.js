import User from "../models/user.model.js";
import createError from "../utils/createError.js";
import { sendEmail } from "./emailUtilis.js";

let adminEmail = "fawadanxari31@gmail.com";

export const deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  // if (req.userId !== user._id.toString()) {
  //   return next(createError(403, "You can delete only your account!"));
  // }
  await User.findByIdAndDelete(req.params.id);
  const email = adminEmail;  // Access the populated 'assignee' object
  const subject = "Alert User is deleted!";
  const message = `
  <h1>User is deleted by admin!</h1>
  `;
  // Send the email to the assignee
  await sendEmail(email, subject, message);
  res.status(200).send("Deleted Sucessfully.");
};

export const getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).send(user);
};

export const getUsers = async (req, res, next) => {
  try {
    // Extract query parameters
    const page = parseInt(req.query.page, 10) || 1; // Default to page 1
    const limit = parseInt(req.query.limit, 10) || 3; // Default limit of 3
    const searchQuery = req.query.search || ''; // Optional search query

    // Validate pagination inputs
    if (page <= 0 || limit <= 0) {
      return next(createError(400, "Page and limit must be positive integers!"));
    }

    const skip = (page - 1) * limit;

    // Construct search criteria
    const searchCriteria = searchQuery
      ? {
          $or: [
            { name: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive name search
            { email: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive email search
          ],
        }
      : {};

    // Get the total number of users matching the criteria
    const totalUsers = await User.countDocuments(searchCriteria);

    // Fetch users based on pagination and search criteria
    const users = await User.find(searchCriteria)
      .skip(skip)
      .limit(limit);

    // Debugging logs for server-side visibility
    // console.log("Total Users:", totalUsers);
    // console.log("Search Query:", searchQuery);
    // console.log("Skip:", skip, "Limit:", limit, "Page:", page);
    // console.log("Users Retrieved:", users.length);

    // Handle the case where no users are found
    if (!users || users.length === 0) {
      return next(createError(404, "No users found!"));
    }

    // Respond with paginated user data
    res.status(200).json({
      totalUsers, // Total number of users matching the search
      currentPage: page, // Current page number
      totalPages: Math.ceil(totalUsers / limit), // Total number of pages
      users, // Array of user data
    });
  } catch (err) {
    // Handle errors and pass them to the error handler
    next(err);
  }
};


export const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    // Find the User to ensure it exists
    const user = await User.findById(userId);
    if (!user) {
      return next(createError(404, "User not found!"));
    }

    // Check if the user has permissions to update the User
    // if (req.user.id !== user.assignee.toString()) {
    //   return next(createError(403, "You can update only your Users!"));
    // }

    // Update the User with the provided details
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: req.body }, // Update fields based on request body
      { new: true } // Return the updated document
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

export const postUser = async (req, res, next) => {
  const newUser = new User({
    userId: req.userId,
    ...req.body,
  });

  try {
    const savedUser = await newUser.save();
    const email = adminEmail;  // Access the populated 'assignee' object
    const subject = "Approval for new user!";
    const message = `
    <h1>New user is signed up and waiting for approval!</h1>
    `;
    // Send the email to the assignee
    await sendEmail(email, subject, message);
    res.status(201).json(savedUser);
  } catch (err) {
    next(err);
  }
};
