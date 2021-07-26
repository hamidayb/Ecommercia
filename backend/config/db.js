import mongoose from "mongoose"

const Connect_DB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    console.log(`Successful Connection ${conn}`)
  } catch (error) {
    console.error(`Unsuccessful Connection ${error}`)
  }
}

export default Connect_DB
