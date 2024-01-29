import mongoose, { ConnectOptions } from 'mongoose'

const mongoDbConnect = async (url: string, options?: ConnectOptions) => {
  try {
    await mongoose.connect(url, options)
    console.log('MongoDb connected successfully')
  } catch (error) {
    console.log(error)
  }
}

export default mongoDbConnect
