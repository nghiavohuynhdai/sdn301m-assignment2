export class ResultDto<T> {
  status: number
  message: string
  data?: T

  private constructor(status: number, message: string, data?: T) {
    this.status = status
    this.message = message
    this.data = data
  }

  static create<T>(status: number, message: string, data?: T) {
    return new ResultDto<T>(status, message, data)
  }
}
