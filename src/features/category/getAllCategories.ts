import { Categories } from '~/models/categories'

export const getAllCategories = async () => {
  const categories = await Categories.find({}).lean().exec()
  return categories
}
