class ProductDto{
    
    constructor(product){
        this.title = product.title,
        this.description = product.description,
        this.price = product.price,
        this._id = product._id

    };
};

class CartDto{
    constructor(cart){
        this.products = cart.products,
        this._id = cart._id

    };
    
};

class UserDto{
    constructor(user){
        this.name = `${user.first_name} ${user.last_name}`,
        this.email = user.email,
        this.cart = user.cart,
        this.rol = user.rol
    };
}

export {ProductDto, CartDto, UserDto}

