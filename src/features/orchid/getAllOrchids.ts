import { Orchids } from '~/models/orchids'

export const getAllOrchids = async () => {
  const orchids = await Orchids.find({}).lean().exec()
  return orchids
}
