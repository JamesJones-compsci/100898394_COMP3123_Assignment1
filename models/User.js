const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true, // usernames must be unique
    },
    email: {
      type: String,
      required: true,
      unique: true, // emails must be unique
      match: [/.+@.+\..+/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // enforce stronger passwords
    },
  },
  { timestamps: true }
);

// Transform output so `_id` becomes `user_id`
userSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.user_id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;