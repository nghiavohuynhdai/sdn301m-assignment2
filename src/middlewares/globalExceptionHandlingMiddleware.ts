import { Request, Response, NextFunction } from 'express'
import { ResultDto } from '~/dto/resultDto'
import { BadRequestException } from '~/exceptions/badRequestException'
import { NotFoundException } from '~/exceptions/notFoundException'

export const globalExceptionHandlingMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500
  let message = 'Internal server error'

  if (err instanceof BadRequestException) {
    statusCode = 400
  }

  if (err instanceof NotFoundException) {
    statusCode = 404
  }

  if (statusCode === 500) {
    console.error(err)
  } else {
    message = err.message
  }

  res.statusCode = statusCode
  // res.json(ResultDto.create(statusCode, message))
  res.render('error', ResultDto.create(statusCode, message))
}
