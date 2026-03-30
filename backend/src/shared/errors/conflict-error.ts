class ConflictError extends Error {
  public statusCode: number;

  constructor(message: string = "Конфликт данных") {
    super(message);
    this.statusCode = 409;
  }
}

export default ConflictError;
