import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product, ProductDocument } from "./schemas/product.schema";

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
  ) {
    this.productModel.insertMany([
      {
        name: 'Зиртек таблетки покрыт.плен.об. 10 мг, 20 шт.',
        image: 'https://cdn.eapteka.ru/upload/offer_photo/266/618/resized/230_230_1.jpeg?_cvc=1621603449',
        code: '266618',
        term: 'Длительный срок',
        brand: 'Зиртек',
        manufacturer: 'ЮСБ Фарма С.А., Бельгия',
        substance: 'Цетиризин',
        price: '199',
        analogs: '10 аналогов от 60 руб.',
      },
      {
        name: 'Зиртек таблетки покрыт.плен.об. 105 мг, 20 шт.',
        image: 'https://cdn.eapteka.ru/upload/offer_photo/266/618/resized/230_230_1.jpeg?_cvc=1621603449',
        code: '266618',
        term: 'Длительный срок',
        brand: 'Зиртек',
        manufacturer: 'ЮСБ Фарма С.А., Бельгия',
        substance: 'Цетиризин',
        price: '199',
        analogs: '10 аналогов от 60 руб.',
      },
      {
        name: 'Зиртек таблетки покрыт.плен.об. 1000',
        image: 'https://cdn.eapteka.ru/upload/offer_photo/266/618/resized/230_230_1.jpeg?_cvc=1621603449',
        code: '266618',
        term: 'Длительный срок',
        brand: 'Зиртек',
        manufacturer: 'ЮСБ Фарма С.А., Бельгия',
        substance: 'Цетиризин',
        price: '199',
        analogs: '10 аналогов от 60 руб.',
      },
      {
        name: 'Зиртек таблетки покрыт.плен.об. 100 мг, 20 шт.',
        image: 'https://cdn.eapteka.ru/upload/offer_photo/266/618/resized/230_230_1.jpeg?_cvc=1621603449',
        code: '266618',
        term: 'Длительный срок',
        brand: 'Зиртек',
        manufacturer: 'ЮСБ Фарма С.А., Бельгия',
        substance: 'Цетиризин',
        price: '199',
        analogs: '10 аналогов от 60 руб.',
      }
   ]);
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }
}