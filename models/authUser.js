const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

// define the Schema (the structure of the article)
const authUserSchema = new Schema({
  profileImage: String,
  username: String,
  email: String,
  password: String,
  customerInfo: [
    {
      fireName: String,
      lastName: String,
      email: String,
      phoneNumber: String,
      age: Number,
      country: String,
      gender: String,
      createdAt: Date,
      updatedAt: { type: Date, default: Date.now },
    },
  ],
});

authUserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();

  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// authUserSchema.pre("save", async function (next) {
//   const salt = await bcrypt.genSalt();
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
//  });

// Create a model based on that schema
const AuthUser = mongoose.model("User", authUserSchema);

// export the model
module.exports = AuthUser;
