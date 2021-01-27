const db = require("../models");

module.exports = {
  findOneByEmail: function (req, res) {
    db.User
      .findOne({ email: req.params.id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.User
      .updateOne({ _id: req.params.id }, { $push: { workouts: req.body.data._id } })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  deleteWorkout: function (req, res) {
    console.log(req.params)
    db.User
      .updateOne({ _id: req.params.userId }, { $pull: { workouts: req.params.workoutId } })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
}
