import { Request, Response } from "express";
import { omit } from "lodash";
import ProductModel from "../models/products.model";
import { CreateProductInput, UpdateProductInput, ReadProductInput, DeleteProductInput } from "../schema/product.schema";
import { createProduct, deleteProduct, findAndUpdateProduct, findProduct } from "../services/product.servie";
import logger from "../utils/logger";

export async function createProductHandler(req: Request<{}, {}, CreateProductInput['body']>, res: Response) {
    const userId = res.locals.user._id;

    const body = req.body;

    const product = await createProduct({...body, user:userId});

    return res.send(product);
}

export async function updateProductHandler(req: Request<UpdateProductInput['params']>, res: Response) {
    const userId = res.locals.user._id;
    const productId = req.params.productId;
    const update = req.body;
    const product = await findProduct({productId});

    if (!product) {
        return res.sendStatus(404);
    }

    if (product.user != userId) {
        return res.sendStatus(403);
    }

    const updatedProduct = await findAndUpdateProduct({product}, update, {new: true});
    return res.send(updatedProduct);
}

export async function getProductHandler(req: Request<UpdateProductInput['params']>, res: Response) {
    const productId = req.params.productId;
    const product = findProduct({productId});

    if (!product) {
        return res.sendStatus(404);
    }

    return res.send(product); 
}

export async function deleteProductHandler(req: Request<UpdateProductInput['params']>, res: Response) {
    const userId = res.locals.user._id;
    const productId = req.params.productId;
    const update = req.body;
    const product = await findProduct({productId});

    if (!product) {
        return res.sendStatus(404);
    }

    if (product.user != userId) {
        return res.sendStatus(403);
    }

    const updatedProduct = await deleteProduct({product});
    return res.sendStatus(200);
}