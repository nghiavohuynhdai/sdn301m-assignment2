import { NotFoundException } from '~/exceptions/notFoundException'
import { Categories } from '~/models/categories'

export const deleteCategory = async (id: string) => {
  const category = await Categories.findById(id).exec()
  if (!category) throw new NotFoundException('Category not found')
  await Categories.deleteOne({ _id: id }).exec()
}
