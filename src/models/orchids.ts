import mongoose from 'mongoose'

const orchidSchema = new mongoose.Schema({
  name: String,
  slug: String,
  image: String,
  price: Number,
  original: String,
  isNatural: Boolean,
  color: String
})

export const Orchids = mongoose.model('orchids', orchidSchema)
