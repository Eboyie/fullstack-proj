import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { ProductModel } from '../models/productModel';

export const productRouter = express.Router();

productRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const { name, brand } = req.query;
    const products = await ProductModel.find();
    let allProducts = [...products];

    if (name) {
      allProducts = allProducts.filter((product) =>
        product.name.toLowerCase().includes((name as string).toLowerCase())
      );
    }

    if (brand) {
      allProducts = allProducts.filter((product) =>
        product.brand.toLowerCase().includes((brand as string).toLowerCase())
      );
    }
    res.json(allProducts);
  })
);

productRouter.get(
  '/categories',
  asyncHandler(async (req: Request, res: Response) => {
    const categories = await ProductModel.find().distinct('category');
    res.json(categories);
  })
);

productRouter.get(
  '/category/:category',
  asyncHandler(async (req: Request, res: Response) => {
    const products = await ProductModel.find({ category: req.params.category });
    if (products) {
      res.json(products);
    } else {
      res.status(404).json({ message: 'Products not found' });
    }
  })
);

//api/products/slug
productRouter.get(
  '/slug/:slug',
  asyncHandler(async (req, res) => {
    const product = await ProductModel.findOne({ slug: req.params.slug });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  })
);

productRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const product = await ProductModel.create(req.body);
    res.json(product);
  })
);

productRouter.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await ProductModel.findByIdAndUpdate(req.params.id);
    if (product) {
      product.name = req.body.name;
      product.slug = req.body.slug;
      product.price = req.body.price;
      product.image = req.body.image;
      product.category = req.body.category;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  })
);

productRouter.patch(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await ProductModel.findByIdAndUpdate(req.params.id);
    if (product) {
      product.name = req.body.name;
      product.slug = req.body.slug;
      product.price = req.body.price;
      product.image = req.body.image;
      product.category = req.body.category;
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  })
);

productRouter.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await ProductModel.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  })
);

productRouter.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await ProductModel.findByIdAndDelete(req.params.id);
    if (product) {
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  })
);
