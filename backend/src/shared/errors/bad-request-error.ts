class BadRequestError extends Error {
  public statusCode: number;

  constructor(message: string = 'Неверный запрос к серверу') {
    super(message);
    this.statusCode = 400;
  }
}

export default BadRequestError;
