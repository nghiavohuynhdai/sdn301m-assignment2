import { kebabCase } from 'lodash'
import { NotFoundException } from '~/exceptions/notFoundException'
import { Orchids } from '~/models/orchids'

export const updateOrchid = async (
  name: string,
  image: string,
  price: number,
  original: string,
  isNatural: boolean,
  color: string,
  slug: string
) => {
  const orchid = await Orchids.findOne({ slug: slug }).exec()
  if (!orchid) throw new NotFoundException('Orchid not found')

  slug = kebabCase(name)
  await Orchids.updateOne({ _id: orchid.id }, { name, image, price, original, isNatural, color, slug }).exec()
}
