// Ресурс не найден в базе данных или по указанному пути

class NotFoundError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);

    this.statusCode = 404;
  }
}

export default NotFoundError;
