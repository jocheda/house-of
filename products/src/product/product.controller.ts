import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ProductDTO } from './dto/product.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@ApiTags('products')
@Controller('api/v1/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Create Product' })
  create(@Body() productDTO: ProductDTO) {
    return this.productService.create(productDTO);
  }

  @CacheTTL(30) // FIXME - Bug, not working
  @UseInterceptors(CacheInterceptor)
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() productDTO: ProductDTO) {
    return this.productService.update(id, productDTO);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productService.delete(id);
  }
}
