const mongoose = require("mongoose");

const docterSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

if (!docterSchema.options.toObject) docterSchema.options.toObject = {};

//customizing user's object
docterSchema.options.toObject.transform = function (doc, user, options) {
  delete user.password;
  delete user.createdAt;
  delete user.updatedAt;
  delete user.__v;
  return user;
};

const doctor = mongoose.model("Doctor", docterSchema);
module.exports = doctor;
