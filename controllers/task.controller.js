import taskModel from "../models/task.model.js";
import Task from "../models/task.model.js";
import userModel from "../models/user.model.js";
import createError from "../utils/createError.js";

export const postTask = async (req, res, next) => {

  const newTask = new taskModel({
    taskId: req.taskId,
    ...req.body,
  });

  try {
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    next(err);
  }
}

export const deleteTask = async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  if (req.params.id !== task._id.toString()) {
    return next(createError(403, "You can delete only your account!"));
  }
  await Task.findByIdAndDelete(req.params.id);
  res.status(200).send("Deleted Sucessfully.");
};

// export const getTask = async (req, res, next) => {
//   const task = await Task.findById(req.params.id);

//   res.status(200).send(task);
// };

export const getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id).populate("assignee", "username email img");
    if (!task) next(createError(404, "Gig not found!"));
    res.status(200).send(task);
  } catch (err) {
    next(err);
  }
};
// export const getTask = async (req, res, next) => {
//   try {
//     const tasks = await Task.find().populate("assignee", "username email img"); // Populate assigneeName

//     if (!tasks || tasks.length === 0) {
//       return next(createError(404, "No tasks found!"));
//     }

//     res.status(200).json(tasks); // Send tasks with populated assigneeName
//   } catch (err) {
//     next(err);
//   }
// };

export const assignedTask = async (req, res, next) => {
  try {
    // Extract query parameters
    const page = parseInt(req.query.page, 10) || 1; // Default to page 1
    const limit = parseInt(req.query.limit, 10) || 3; // Default limit of 3
    const status = req.query.status; // Extract the status query parameter

    // Validate page and limit values
    if (page <= 0 || limit <= 0) {
      return next(createError(400, "Page and limit must be positive integers!"));
    }

    const skip = (page - 1) * limit;

    // Build the filter object
    let filter = { assignee: req.params.id }; // Basic filter for assignee ID
    if (status) {
      filter.status = status; // Add status filter if present
    }

    // Get the total count of tasks matching the filter
    const totalTasks = await Task.countDocuments(filter);

    // Fetch paginated tasks matching the filter
    const tasks = await Task.find(filter)
      .populate("assignee", "username email img") // Populate assignee details
      .skip(skip)
      .limit(limit);

    // Handle case where no tasks are found
    if (!tasks || tasks.length === 0) {
      return next(createError(404, "No tasks found or assigned to this user!"));
    }

    // Respond with paginated task data
    res.status(200).json({
      totalTasks, // Total number of tasks assigned to the user
      currentPage: page, // Current page number
      totalPages: Math.ceil(totalTasks / limit), // Total number of pages
      tasks, // Array of assigned tasks
    });
  } catch (err) {
    // Pass errors to the error-handling middleware
    next(err);
  }
};





export const getTasks = async (req, res, next) => {
  try {
    res.status(200).json("welcome fawad on task route");
    // Extract query parameters
    // const page = parseInt(req.query.page, 10) || 1;
    // const limit = parseInt(req.query.limit, 10) || 3;
    // const status = req.query.status; 

    // // Validate input
    // if (page <= 0 || limit <= 0) {
    //   return next(createError(400, "Page and limit must be positive integers!"));
    // }

    // const skip = (page - 1) * limit;

   
    // const filter = {};
    // if (status) {
    //   filter.status = status; 
    // }

    // const totalTasks = await Task.countDocuments(filter);
    // if (totalTasks === 0) {
    //   return res.status(200).json({});
    // }
    // const tasks = await Task.find(filter)
    //   .populate("assignee", "username email img")
    //   .skip(skip)
    //   .limit(limit);

    // res.status(200).json({
    //   totalTasks, // Total number of matching records
    //   currentPage: page, // Current page number
    //   totalPages: Math.ceil(totalTasks / limit), // Total pages
    //   tasks, // Array of retrieved tasks
    //});
  } catch (err) {
    next(err);
  }
};





export const updateTask = async (req, res, next) => {
  try {
    const taskId = req.params.id;

    // Find the task to ensure it exists
    const task = await Task.findById(taskId);
    if (!task) {
      return next(createError(404, "Task not found!"));
    }

    // Check if the user has permissions to update the task
    // if (req.user.id !== task.assignee.toString()) {
    //   return next(createError(403, "You can update only your tasks!"));
    // }

    // Update the task with the provided details
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { $set: req.body }, // Update fields based on request body
      { new: true } // Return the updated document
    );

    res.status(200).json(updatedTask);
  } catch (err) {
    next(err);
  }
};