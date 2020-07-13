const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Doctor", "Patient"],
    },
    //reports array for every users reports
    reports: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Report",
      },
    ],
  },
  {
    timestamps: true,
  }
);

if (!userSchema.options.toObject) userSchema.options.toObject = {};

//customizing user's object
userSchema.options.toObject.transform = function (doc, user, options) {
  delete user.password;
  delete user.createdAt;
  delete user.reports;
  delete user.category;
  delete user.updatedAt;
  delete user.__v;
  return user;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
