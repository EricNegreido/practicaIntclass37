import {productsRepository} from "../repositories/product.index.js";

const getProductsService = async(limit, page, sort, query) => {
    const products = await productsRepository.getProducts(limit, page, sort, query);
    return products
}

const getProductIdService = async(id) =>{

    const product = await productsRepository.getProductId(id);
    return product;

}

const addProductService = async ({title, description, price,stock}) => {
    const result = await productsRepository.createProduct({
        title,
        description,
        price,
        stock
    });
    return result;
}

const updateProductService = async(id, title, description, price, stock ) =>{
    const result = await productsRepository.updateProduct(id, {
        title,
        description,
        price,
        stock
    });
    return result;
};

const deleteProductService = async(id) => {
   const result = await productsRepository.deleleteProduct(id);
   return result;
}

export {
    getProductsService,
    getProductIdService,
    addProductService,
    updateProductService,
    deleteProductService
}