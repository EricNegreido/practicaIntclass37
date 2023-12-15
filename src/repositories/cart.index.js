import {Cart} from '../dao/factory.js'
import CartsRepository from './cart.repository.js'; 

const cartsRepository = new CartsRepository(new Cart());

export { cartsRepository};
