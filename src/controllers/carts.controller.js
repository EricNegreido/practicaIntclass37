import { getCartService, updateCartService, addCartService } from '../services/carts.services.js';
import { getProductIdService, updateProductService } from '../services/products.services.js';
import { ticketService } from '../services/ticket.services.js';
import { generateNotFoundInfo } from '../middleware/errors/info.js';
import Errors from '../middleware/errors/enums.js';
import CustomError from '../middleware/errors/CustomError.js';

const getCart = async (req, res) => {

    const {cid} = req.params;
   
    try{
        const carts = await getCartService(cid);
        if(!carts){
                throw CustomError.createError({
                name:'Cart Not found',
                cause: generateNotFoundInfo(cid),
                message:'Cart Not found',
                code:Errors.CART_NOT_FOUND
        })};
            
            req.logger.info("cart successfully obtained")
            res.send({status: 'sucess', payload: carts});           

    }
    catch(error){

        req.logger.error("error getting carts");
        res.status(500).send({status: 'error', error: error.message})
        
    }

};

const addCartProduct = async (req, res) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const { quantity } = req.body;

        const cart = await getCartService(cid)
        const product = await getProductIdService(pid);

        if(cart){

            if (product) {
                
                const existingProduct = cart.products.find(item => item.product._id === pid);
                if (existingProduct) {
                    existingProduct.quantity += quantity || 1;
    
                } else {
                    

                    cart.products.push({ product: pid, quantity: quantity || 1 });
                }
            
        }

     }

    
    const result = await updateCartService(cid, cart.products);
    ///PROBLEMAS AL GUARDAR
    req.logger.info("product successfully added to cart")
    res.status(201).send({status: 'sucess', payload: result}); 


    } catch (error) {
        req.logger.error("error when adding the product");
        res.status(500).send({status: 'error', error: error.message})
    }
};

// ARREGLAR QUANTITY

const updateCartProduct =  async (req, res) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const { quantity } = req.body;

        const cart = await getCartService(cid)
        const product = await getProductIdService(pid);


        if(cart && product){// pasar a services

            const existingProduct = cart.products.find(item => item.id === pid);
            if (existingProduct) {

                existingProduct.quantity += quantity || 1;
            }

     }


    const result = await updateCartService(cid, cart.products);
    req.logger.info("cart successfully updated")
    res.status(201).send({status: 'sucess', payload: result}); 


    } catch (error) {
        req.logger.error("error when updating the product");
        res.status(500).send({status: 'error', error: error.message})
    }
};

const deleteCartProduct = async (req, res) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;

        const cart = await getCartService(cid)
        const product = await getProductIdService(pid);


        if(cart && product){// pasar a services

            cart.products = cart.products.filter(item => item.id !== pid);
            const result = await updateCartService(cid, cart.products);
            req.logger.info("product successfully removed from cart") 
            res.status(201).send({status: 'sucess', payload: result}); 
        }else{
            res.status(404).json({ error: 'Product or Cart Not found' });
        }
        

    } catch (error) {
        req.logger.error("error when removing the product");
        res.status(500).send({status: 'error', error: error.message})

    }
};

const addCart = async (req, res) =>{
    
    try{
        const result = await addCartService();
        req.logger.info("cart successfully created") 
        res.status(201).send({status: 'sucess', payload: result}); 

    }catch(error){
        req.logger.error("error creating cart");
        res.status(500).send({status: 'error', error: error.message})
    }
};

const cartPurchaser = async(req,res) => {
    const {cid} = req.params;
    try{
        const carts = await getCartService(cid);
        const cartProducts = carts.products

        const buyCart = cartProducts.filter(elem => elem.stock >= elem.quantity);
        // const notBuyCart = carts.products.filter(elem => elem.stock < elem.quantity);

        let total = 0;
        buyCart.forEach(elem => { total = elem.price + total})

        const ticket = ticketService(total)
        res.send({status: 'sucess', payload: ticket});
    }catch(error){
        req.logger.error("cart purchase error");
        res.status(500).send({status: 'error', error: error.message})
    }
};


const deleteCart = async (req, res) => {
    try {
        const cid = req.params.cid;

        const cart = await getCartService(cid)

        if(cart){

            cart.products = [];
            const result = await updateCartService(cid, cart.products);
            
            req.logger.error("cart removing error");
            res.status(201).send({status: 'sucess', payload: result}); 
        }else{
            res.status(404).json({ error: 'product or cart not found' });
        }
        

    } catch (error) {
        req.logger.error("error when removing the cart");
        res.status(500).send({status: 'error', error: error.message})

    }
};


export {
    getCart,
    addCartProduct,
    updateCartProduct,
    addCart,
    deleteCartProduct,
    deleteCart,
    cartPurchaser
}