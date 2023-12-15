import {Product} from '../dao/factory.js'
import ProductsRepository from './product.repository.js'; 

const productsRepository = new ProductsRepository(new Product());

export { productsRepository};
