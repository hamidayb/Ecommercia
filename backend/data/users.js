import bcrypt from "bcryptjs"

const users = [
  {
    name: "Hamid Ayub",
    email: "hamidayb123@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Sohil Tanveer",
    email: "sohail@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Haris Bin Amir",
    email: "haris@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
]

export default users
