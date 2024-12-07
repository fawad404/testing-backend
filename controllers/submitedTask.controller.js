import submitedTaskModel from "../models/submitedTask.model.js";
import taskModel from "../models/task.model.js";
import createError from 'http-errors';


export const postUpdatedTask = async (req, res, next) => {

    const newUpdatedTask = new submitedTaskModel({
      ...req.body,
    });
  
    try {
      const savedUpdatedTask = await newUpdatedTask.save();
      res.status(201).json(savedUpdatedTask);
    } catch (err) {
      next(err);
    }
  }

  export const putUpdatedTask = async (req, res, next) => {
    const { id } = req.params; // Assuming the ID of the task to be updated is passed as a route parameter
  
    try {
      const updatedTask = await submitedTaskModel.findByIdAndUpdate(
        id,
        { ...req.body },
        { new: true, runValidators: true } // Return the updated document and run schema validators
      );
  
      if (!updatedTask) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      res.status(200).json(updatedTask);
    } catch (err) {
      next(err);
    }
  };
  

  export const getUpdatedTask = async (req, res, next) => {
    try {
      // Find the submitted task by the provided ID
      const submittedTask = await submitedTaskModel.findOne({ id: req.params.id });
      if (!submittedTask) {
        return res.status(200).json({});
        //return next(createError(404, "Submitted task not found!"));
      }
  
      // Send the submitted task as a response
      res.status(200).json(submittedTask);
    } catch (err) {
      // Pass the error to the next middleware
      next(err);
    }
  };