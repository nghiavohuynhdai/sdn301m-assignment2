import { BadRequestException } from '~/exceptions/badRequestException'
import { Categories } from '~/models/categories'

export const createCategory = async (name: string, description: string) => {
  let category = await Categories.findOne({ name: name }).exec()
  if (category) throw new BadRequestException('Category name exits')
  category = new Categories({ name, description })
  await category.save()
}
