import { type NextFunction, type Request, type Response } from "express";
import { ProductRepository } from "@/data-source";
import { IProduct } from "./product.types";
import { DB_RELATIONS } from "@shared/constants";
import InternalServerError from "@shared/errors/internal-server-error";
import NotFoundError from "@shared/errors/not-found-error";
import { optional } from "joi";

export const findAllProducts = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const products = await ProductRepository.find({
      relations: [DB_RELATIONS.OPTIONS, DB_RELATIONS.DISCOUNTS],
    });

    const response = products.map((product) => ({
      id: product.id,
      name: product.name,
      options: product.options.map(({ productId, ...option }) => option),
      discounts: product.discounts.map(
        ({ productId, ...discount }) => discount,
      ),
    }));

    res.status(200).json({
      success: true,
      data: response,
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

    if (!product) return next(new NotFoundError(`Товар с id: ${id} не найден`));

    const response = {
      id: product.id,
      name: product.name,
      options: product.options.map(({ productId, ...option }) => option),
      discounts: product.discounts.map(
        ({ productId, ...discount }) => discount,
      ),
    };

    res.status(200).json({
      success: true,
      data: response,
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
    const data: Omit<IProduct, "id"> = req.body;
    const newProduct = ProductRepository.create(data);
    const savedProduct = await ProductRepository.save(newProduct);

    const response = {
      id: savedProduct.id,
      name: savedProduct.name,
      options: savedProduct.options.map(({ productId, ...option }) => option),
      discounts: savedProduct.discounts.map(
        ({ productId, ...discount }) => discount,
      ),
    };

    res.status(201).json({
      success: true,
      data: response,
      message: "Продукт успешно создан",
    });
  } catch (error) {
    next(new InternalServerError("Произошла ошибка при создании товара"));
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data: Omit<IProduct, "id"> = req.body;
    const id = req.params.id.toString();
    const updatedProduct = await ProductRepository.findOne({
      where: { id },
      relations: [DB_RELATIONS.OPTIONS, DB_RELATIONS.DISCOUNTS],
    });

    if (!updatedProduct)
      return next(new NotFoundError(`Товар с id: ${id} не найден`));

    updatedProduct.name = data.name;
    updatedProduct.options = data.options.map((option) => ({
      ...option,
      productId: updatedProduct.id,
    }));
    updatedProduct.discounts = data.discounts.map((discount) => ({
      ...discount,
      productId: updatedProduct.id,
    }));

    await ProductRepository.save(updatedProduct);

    const response = {
      id: updatedProduct.id,
      name: updatedProduct.name,
      options: updatedProduct.options.map(({ productId, ...option }) => option),
      discounts: updatedProduct.discounts.map(
        ({ productId, ...discount }) => discount,
      ),
    };

    res.status(200).json({
      success: true,
      data: response,
      message: `Товар с id ${id} успешно обновлен`,
    });
  } catch (error) {
    next(
      new InternalServerError(
        `Ошибка при обновлении товара с id: ${req.params.id}`,
      ),
    );
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id.toString();
    const result = await ProductRepository.delete(id);

    if (result.affected === 0)
      return next(new NotFoundError(`Товар с id: ${id} не найден`));

    res.status(200).json({
      success: true,
      message: `Товар с id ${id} успешно удален`,
    });
  } catch (error) {
    next(
      new InternalServerError(
        `Ошибка при удалении товара с id: ${req.params.id}`,
      ),
    );
  }
};
