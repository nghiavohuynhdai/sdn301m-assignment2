import { kebabCase } from 'lodash'
import { BadRequestException } from '~/exceptions/badRequestException'
import { Orchids } from '~/models/orchids'

export const createOrchid = async (
  name: string,
  image: string,
  price: number,
  original: string,
  isNatural: boolean,
  color: string
) => {
  let orchid = await Orchids.findOne({ name: name }).exec()
  if (orchid) throw new BadRequestException('Orchid name exits')
  const slug = kebabCase(name)
  orchid = new Orchids({ name, image, price, original, isNatural, color, slug })
  await orchid.save()
}
