const db = require("../models");
const Tutorial = db.tutorials;
// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    // Create a Tutorial
    const tutorial = new Tutorial({
      title: req.body.title,
      description: req.body.description,
      published: req.body.published ? req.body.published : false
    });
    // Save Tutorial in the database
    tutorial
      .save(tutorial)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
  };
// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  res.send("ok hai yar");
};
// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  
};
// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  
};
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  
};
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};
// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  
};