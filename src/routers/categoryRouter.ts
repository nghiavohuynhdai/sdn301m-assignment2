import { Router, RequestHandler } from 'express'
import { isValidObjectId } from 'mongoose'
import { ResultDto } from '~/dto/resultDto'
import { BadRequestException } from '~/exceptions/badRequestException'
import { NotFoundException } from '~/exceptions/notFoundException'
import { createCategory } from '~/features/category/createCategory'
import { deleteCategory } from '~/features/category/deleteCategory'
import { getAllCategories } from '~/features/category/getAllCategories'
import { getCategoryById } from '~/features/category/getCategoryById'
import { updateCategory } from '~/features/category/updateCategory'

const getAllCategoriesHandler: RequestHandler = async (_, res) => {
  const categories = await getAllCategories()

  res.json(ResultDto.create(200, '', categories))
}

const getCategoryByIdValidator: RequestHandler = ({ params }, res, next) => {
  if (isValidObjectId(params.id) === false) {
    throw new BadRequestException('Invalid category id')
  }

  next()
}

const getCategoryByIdHandler: RequestHandler = async (req, res, next) => {
  try {
    const category = await getCategoryById(req.params.id)

    if (category === null) {
      throw new NotFoundException('Category not found')
    }

    res.json(ResultDto.create(200, '', category))
  } catch (error) {
    next(error)
  }
}

const createCategoryValidator: RequestHandler = (req, res, next) => {
  const body: { name?: string; description?: string } = req.body
  if (!body.name) {
    throw new BadRequestException('Category name is required')
  }

  if (body.description == null) {
    throw new BadRequestException('Category description is required')
  }

  next()
}

const createCategoryHandler: RequestHandler = async (req, res, next) => {
  const body: { name: string; description: string } = req.body

  try {
    await createCategory(body.name, body.description)

    res.statusCode = 201
    res.json(ResultDto.create(201, 'Category created'))
  } catch (error) {
    next(error)
  }
}

const updateCategoryValidator: RequestHandler = (req, res, next) => {
  const params = req.params
  const body: { id?: string; name?: string; description?: string } = req.body

  if (!params.id) {
    throw new BadRequestException('Category id is required')
  }

  if (isValidObjectId(params.id) === false) {
    throw new BadRequestException('Invalid category id')
  }

  if (!body.name) {
    throw new BadRequestException('Category name is required')
  }

  if (body.description == null) {
    throw new BadRequestException('Category description is required')
  }

  next()
}

const updateCategoryHandler: RequestHandler = async (req, res, next) => {
  const params = req.params
  const body: { name: string; description: string } = req.body

  try {
    await updateCategory(params.id, body.name, body.description)

    res.statusCode = 200
    res.json(ResultDto.create(200, 'Category updated'))
  } catch (error) {
    next(error)
  }
}

const deleteCategoryValidator: RequestHandler = (req, res, next) => {
  if (isValidObjectId(req.params.id) === false) {
    throw new BadRequestException('Invalid category id')
  }

  next()
}

const deleteCategoryHandler: RequestHandler = async (req, res, next) => {
  try {
    await deleteCategory(req.params.id)

    res.statusCode = 200
    res.json(ResultDto.create(200, 'Category deleted'))
  } catch (error) {
    next(error)
  }
}

const categoryRouter = Router()

categoryRouter.get('/', getAllCategoriesHandler)

categoryRouter.get('/:id', getCategoryByIdValidator, getCategoryByIdHandler)

categoryRouter.post('/', createCategoryValidator, createCategoryHandler)

categoryRouter.put('/:id', updateCategoryValidator, updateCategoryHandler)

categoryRouter.delete('/:id', deleteCategoryValidator, deleteCategoryHandler)

export { categoryRouter }
