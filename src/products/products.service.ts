import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './product.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(doc: string) {
    // tslint:disable-next-line:no-console
    console.log(doc);
    const newProduct = new this.productModel({
      article: doc,
    });
    const result = await newProduct.save();
    return result.id as string;
  }

  async getProducts() {
    const products = await this.productModel.find().exec();
    return products.map(prod => ({
      id: prod.id,
      article: prod.article,
    }));
  }

  async getSingleProduct(productId: string) {
    const product = await this.findProduct(productId);
    return {
      id: product.id,
      article: product.article,
    };
  }

  async updateProduct(
    productId: string,
    article: string,
  ) {
    const updatedProduct = await this.findProduct(productId);
    if (article) {
      updatedProduct.article = article;
    }
    updatedProduct.save();
  }

  async deleteProduct(prodId: string) {
    const result = await this.productModel.deleteOne({_id: prodId}).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find product.');
    }
  }

  private async findProduct(id: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find product.');
    }
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return product;
  }
}
