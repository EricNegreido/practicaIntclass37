import {ProductDto} from '../DTOs/dto.js'

export default class ProductsRepository {
    constructor(dao){
        this.dao= dao;
    }

    getProducts = async (limit, page, sort, query) => {
        const products = await this.dao.getAll(limit, page, sort, query);
        // const obtained = new ProductDto(products.docs);
        // console.log(obtained);
        return products;

    }

    getProductId = async (id) => {
        const product = await this.dao.getById(id);
        // const obtained = new ProductDto(product);
        return product;

    }

    createProduct = async (product) => {
        const result = await this.dao.save(product);
        return result;
    }

    updateProduct = async (id, product) => {
        const result = await this.dao.update(id, product);
        return result
    }

    deleleteProduct = async(id) => {
        const result = await this.dao.delete(id);
        return result
    }
};
