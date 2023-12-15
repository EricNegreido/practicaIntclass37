import { v4 as uuidv4 } from "uuid";

export default class Carts {
    constructor(){
        this.data = []
        console.log("Working Carts with Memory");
    }

    getArray= async (cid) => {
        const result = this.data.find(elem => elem._id === cid)
        console.log(result)
        return result;

    }
    save = async () => {
        
        const cart = {
        _id : uuidv4(),
        products:[]
        }
        this.data.push(cart);
        return cart;
    }

    update = async (id, cart) => {
        const index = this.data.findIndex(elem => elem._id === id)
        this.data[index] = {_id : id, products: cart};
        return cart;        
    }
}