import { Router, RequestHandler } from 'express'
import { ResultDto } from '~/dto/resultDto'
import { BadRequestException } from '~/exceptions/badRequestException'
import { NotFoundException } from '~/exceptions/notFoundException'
import { createOrchid } from '~/features/orchid/createOrchid'
import { deleteOrchid } from '~/features/orchid/deleteOrchid'
import { getAllOrchids } from '~/features/orchid/getAllOrchids'
import { getOrchidBySlug } from '~/features/orchid/getOrchidBySlug'
import { updateOrchid } from '~/features/orchid/updateOrchid'

const getAllOrchidsHandler: RequestHandler = async (_, res) => {
  const orchids = await getAllOrchids()

  // res.json(ResultDto.create(200, '', categories))
  res.render('orchids', {
    orchids: orchids.map((orchid, index) => ({
      no: index + 1,
      name: orchid.name,
      image: orchid.image,
      price: orchid.price,
      original: orchid.original,
      isNatural: orchid.isNatural,
      color: orchid.color,
      slug: orchid.slug
    }))
  })
}

const getOrchidBySlugHandler: RequestHandler = async (req, res, next) => {
  try {
    const orchid = await getOrchidBySlug(req.params.slug)

    if (orchid === null) {
      throw new NotFoundException('Orchid not found')
    }

    // res.json(ResultDto.create(200, '', orchid))
    res.render('orchid-detail', { ...orchid })
  } catch (error) {
    next(error)
  }
}

const createOrchidValidator: RequestHandler = (req, res, next) => {
  const body: {
    name?: string
    image?: string
    price?: number
    original?: string
    isNatural?: boolean
    color?: string
  } = req.body

  if (!body.name) {
    throw new BadRequestException('orchid name is required')
  }

  if (!body.image) {
    throw new BadRequestException('orchid description is required')
  }

  if (body.price == null || body.price == undefined) {
    throw new BadRequestException('orchid price is required')
  }

  if (body.price < 0) {
    throw new BadRequestException('orchid price must be greater than 0')
  }

  if (!body.original) {
    throw new BadRequestException('orchid original is required')
  }

  if (body.isNatural == null || body.isNatural == undefined) {
    throw new BadRequestException('orchid isNatural is required')
  }

  if (!body.color) {
    throw new BadRequestException('orchid color is required')
  }

  next()
}

const createOrchidHandler: RequestHandler = async (req, res, next) => {
  const body: {
    name: string
    image: string
    price: number
    original: string
    isNatural: boolean
    color: string
  } = req.body

  try {
    await createOrchid(body.name, body.image, body.price, body.original, body.isNatural, body.color)

    res.statusCode = 201
    res.json(ResultDto.create(201, 'orchid created'))
  } catch (error) {
    next(error)
  }
}

const updateOrchidValidator: RequestHandler = (req, res, next) => {
  const body: {
    name?: string
    image?: string
    price?: number
    original?: string
    isNatural?: boolean
    color?: string
    slug?: string
  } = req.body

  if (!body.name) {
    throw new BadRequestException('orchid name is required')
  }

  if (!body.image) {
    throw new BadRequestException('orchid description is required')
  }

  if (body.price == null || body.price == undefined) {
    throw new BadRequestException('orchid price is required')
  }

  if (body.price < 0) {
    throw new BadRequestException('orchid price must be greater than 0')
  }

  if (!body.original) {
    throw new BadRequestException('orchid original is required')
  }

  if (body.isNatural == null || body.isNatural == undefined) {
    throw new BadRequestException('orchid isNatural is required')
  }

  if (!body.color) {
    throw new BadRequestException('orchid color is required')
  }

  if (!req.params.slug) {
    throw new BadRequestException('orchid slug is required')
  }

  next()
}

const updateOrchidHandler: RequestHandler = async (req, res, next) => {
  const body: {
    name: string
    image: string
    price: number
    original: string
    isNatural: boolean
    color: string
  } = req.body

  try {
    await updateOrchid(body.name, body.image, body.price, body.original, body.isNatural, body.color, req.params.slug)

    res.statusCode = 200
    res.json(ResultDto.create(200, 'orchid updated'))
  } catch (error) {
    next(error)
  }
}

const deleteOrchidHandler: RequestHandler = async (req, res, next) => {
  try {
    await deleteOrchid(req.params.slug)

    res.statusCode = 200
    res.json(ResultDto.create(200, 'Orchid deleted'))
  } catch (error) {
    next(error)
  }
}

const orchidRouter = Router()

orchidRouter.get('/', getAllOrchidsHandler)

orchidRouter.get('/:slug', getOrchidBySlugHandler)

orchidRouter.post('/', createOrchidValidator, createOrchidHandler)

orchidRouter.put('/:slug', updateOrchidValidator, updateOrchidHandler)

orchidRouter.delete('/:slug', deleteOrchidHandler)

export { orchidRouter }
