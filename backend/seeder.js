import mongoose from "mongoose"
import dotenv from "dotenv"
import Connect_DB from "./config/db.js"
import Products from "./data/products.js"
import Users from "./data/users.js"
import UserModel from "./models/UserModel.js"
import ProductModel from "./models/ProductModel.js"
import OrderModel from "./models/OrderModel.js"
import colors from "colors"

dotenv.config()
Connect_DB()

const importData = async () => {
  try {
    await UserModel.deleteMany()
    await ProductModel.deleteMany()
    await OrderModel.deleteMany()

    const usersCreated = await UserModel.insertMany(Users)
    const adminUser = usersCreated[0]._id

    const sampleProducts = Products.map((product) => {
      return { ...product, user: adminUser }
    })
    console.log(sampleProducts)
    await ProductModel.insertMany(sampleProducts)

    console.log("Data imported".green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error.message}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await UserModel.deleteMany()
    await ProductModel.deleteMany()
    await OrderModel.deleteMany()

    console.log("Data destroyed".red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error.message}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === "-d") {
  destroyData()
} else {
  importData()
}
