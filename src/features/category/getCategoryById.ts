import { Categories } from '~/models/categories'

export const getCategoryById = async (id: string) => {
  const category = await Categories.findById(id).lean().exec()
  return category
}
