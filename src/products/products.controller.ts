import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post() // create product
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get('/group') // ✅
  findAll() {
    return this.productsService.findAll();
  }

  @Get('') // ✅ alllproduct
  findOne() {
    return this.productsService.getAllProduct();
  }

  @Get(':id') // ✅ product by id
  update(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.getProductByProductId(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
