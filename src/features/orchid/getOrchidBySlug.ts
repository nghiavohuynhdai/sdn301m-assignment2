import { Orchids } from '~/models/orchids'

export const getOrchidBySlug = async (slug: string) => {
  const orchid = await Orchids.findOne({ slug: slug }).lean().exec()
  return orchid
}
