import {cartsRepository} from "../repositories/cart.index.js";



const getCartService= async (cid) =>{
    const cart = await cartsRepository.getCart(cid);
    return cart;

}

const addCartService = async() =>{
    const result = await cartsRepository.createCart();
    return result;
}

const updateCartService =  async(cid, product) =>{
    console.log(product)
    const result = await cartsRepository.updateCart(cid, product);
    return result;
}

export { getCartService,
        updateCartService,
        addCartService
    }

