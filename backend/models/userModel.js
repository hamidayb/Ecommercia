import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// encrypt password before a user is registered
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    // if password is not needed to be modified by user then skip further execution
    next()
  }

  const salt = await bcrypt.genSalt(10) // rounds for hash
  this.password = await bcrypt.hash(this.password, salt)
})

const userModel = mongoose.model("User", userSchema)

export default userModel
