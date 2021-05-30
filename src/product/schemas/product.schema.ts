import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
  image: string;

  @Prop()
  code: string;

  @Prop()
  term: string;

  @Prop()
  brand: string;

  @Prop()
  manufacturer: string;

  @Prop()
  substance: string;

  @Prop()
  price: string;

  @Prop()
  analogs: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);