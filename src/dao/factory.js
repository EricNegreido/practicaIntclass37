import config from "../config/config.js";

const persistence = config.persistence;
let Product;
let Cart;

switch(persistence) {
    case 'MONGO':
        console.log('Persistence: Data Base')
        const mongoose = await import('mongoose');
        await mongoose.connect(config.mongoUrl);
        console.log('BBD connected App');

        const { default: ProductMongo } = await import('./dbManagers/products.manager.js');
        const { default: CartMongo } = await import('./dbManagers/carts.manager.js');
        Product = ProductMongo;
        Cart = CartMongo;

        break; 
    case 'MEMORY':
        console.log('Persistence: Memory')
        const { default: ProductMemory } = await import('./memoryManagers/products.manager.js');
        const { default: CartMemory } = await import('./memoryManagers/carts.manager.js');
        Product = ProductMemory;
        Cart = CartMemory;
        break;
}

export{
    Product,
    Cart
}