// Importa la clase PartialType del paquete '@nestjs/mapped-types'.
import { PartialType } from '@nestjs/mapped-types';

// Importa la clase CreateProductDto del archivo 'create-product.dto.ts'.
import { CreateProductDto } from './create-product.dto';

// Define la clase UpdateProductDto que extiende de la clase PartialType(CreateProductDto).
export class UpdateProductDto extends PartialType(CreateProductDto) { }
