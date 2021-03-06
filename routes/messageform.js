const router = require("express").Router();
require("dotenv").config();

let Message = require("../model/messages.schema");

// send from start
router.post("/", async (req, res) => {
  const message = await new Message({
    // from input name in frontend
    regnumber: req.body.regnumber,
    subject: req.body.subject,
    name: req.body.name,
    email: req.body.email,
    description: req.body.description,
  }).save();
  res.send(message);
});

// get all the messages from admin
router.get("/admin/messages", async (req, res) => {
  const message = await Message.find({});
  res.send(message);
});

// get the info from Id to respond message
router.get("/admin/messages/add/:id", async (req, res) => {
  const id = await Message.findById({ _id: req.params.id });
  res.send(id);
});

// respond with email
router.post("/admin/message/add/:id", async (req, res) => {
  const message = await new Message({
    regnumber: req.body.regnumber,
    subject: req.body.subject,
    name: req.body.name,
    email: req.body.email,
    description: req.body.description,
  }).save();
  console.log(message);
  res.send(message);
});
// delete message from id
router.delete("/admin/messages/:id", async (req, res) => {
  const id = await Message.findByIdAndDelete({
    _id: req.params.id,
  });
  res.send(id);
});

module.exports = router;
