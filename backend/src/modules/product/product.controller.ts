import { ProductRepository } from "@/data-source";
import { DB_RELATIONS } from "@/shared/constants";
import InternalServerError from "@/shared/errors/internal-server-error";
import NotFoundError from "@/shared/errors/not-found-error";
import { type NextFunction, type Request, type Response } from "express";
import { IProduct } from "./product.types";

export const findAllProducts = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const products = await ProductRepository.find({
      relations: [DB_RELATIONS.OPTIONS, DB_RELATIONS.DISCOUNTS],
    });

    if (products.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        message: "Список товаров пуст",
      });
    }

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    next(new InternalServerError("Ошибка при получении списка товаров"));
  }
};

export const findProductById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id.toString();

    const product = await ProductRepository.findOne({
      where: { id },
      relations: [DB_RELATIONS.OPTIONS, DB_RELATIONS.DISCOUNTS],
    });

    if (!product) {
      return next(new NotFoundError(`Товар с id: ${id} не найден`));
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(
      new InternalServerError(
        `Ошибка при получении товара с id: ${req.params.id}`,
      ),
    );
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data: IProduct = req.body;

    const newProduct = ProductRepository.create(data);
    const savedProduct = await ProductRepository.save(newProduct);

    const productWithRelations = await ProductRepository.findOne({
      where: { id: savedProduct.id },
      relations: [DB_RELATIONS.OPTIONS, DB_RELATIONS.DISCOUNTS],
    });

    res.status(201).json({
      success: true,
      data: productWithRelations,
      message: "Продукт успешно создан",
    });
  } catch (error) {
    next(new InternalServerError("Произошла ошибка при создании товара"));
  }
};
