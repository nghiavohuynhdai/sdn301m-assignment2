import { NotFoundException } from '~/exceptions/notFoundException'
import { Categories } from '~/models/categories'

export const updateCategory = async (id: string, name: string, description: string) => {
  const category = await Categories.findById(id).exec()
  if (!category) throw new NotFoundException('Category not found')
  await Categories.updateOne({ _id: id }, { name, description }).exec()
}
