const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

const authlog = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user.is_admin == false) {
    res.json("User is Aunth");
  }

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const getUser = asyncHandler(async (req, res) => {
  try {
    const data = await User.find();
    res.json(data);
  } catch (error) {
    console.log(error.message);
  }
});

const creteUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Fill all the Feilds");
  } else {
    const newuser = new User({
      name: name,
      email: email,
      password: password,
    });

    const saveuser = await newuser.save();
    res.status(201).json(saveuser);
  }
});

const getoneUser = asyncHandler(async (req, res) => {
  const note = await User.findById(req.params.id);

  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: "Note not found" });
  }

  res.json(note);
});

const updateUser = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  const updateuser = await User.findById(req.params.id);
  console.log(updateuser);
  // if (updateuser._id.toString() !== req.user._id.toString()) {
  //   res.status(401);
  //   throw new Error("You can't perform this action");
  // }

  if (updateuser) {
    updateuser.name = name;
    updateuser.email = email;

    const update = await updateuser.save();
    res.json(update);
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  // if (user._id.toString() !== req.user._id.toString()) {
  //   res.status(401);
  //   throw new Error("You can't perform this action");
  // }
  if (user) {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User Removed" });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

module.exports = {
  getUser,
  creteUser,
  updateUser,
  deleteUser,
  authlog,
  getoneUser,
};
