const Guest = require("../Model/GuestModel");

// Add data controller
(module.exports.addUser = async function (req, res) {
  try {
    const gus = new Guest(req.body);
    const savedGuest = await gus.save();
    res.status(201).json(savedGuest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}),
  // Get all data controller
  (module.exports.getAllUsers = async function (req, res) {
    try {
      const Guests = await Guest.find(req.query);
      res.status(200).json(Guests);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
