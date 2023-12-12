import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ProductDTO } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(product: ProductDTO) {
    const productNew = this.productRepository.create(product);

    return await this.productRepository.save(productNew);
  }

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: number) {
    return await this.productRepository.findOneById(id);
  }

  async update(id: number, product: ProductDTO) {
    const productUpdate = await this.productRepository.findOneById(id);

    productUpdate.name = product.name;
    productUpdate.description = product.description;
    productUpdate.price = product.price;

    return await this.productRepository.save(productUpdate);
  }

  async delete(id: number) {
    return await this.productRepository.delete(id);
  }
}
