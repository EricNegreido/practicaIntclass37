import { v4 as uuidv4 } from "uuid";

export default class Products {
    constructor(){
        this.data = []
        console.log("Working products with Memory");
    }

    getAll = async () => {

        return this.data;

    }
    getById = async (id) => {
        const result = this.data.find(elem => elem._id === id)
        return result;

    }
    save = async (product) => {
        product._id = uuidv4();
       this.data.push(product);
       return product;
    }

    update = async (id, product) => {
        const index = this.data.findIndex(elem => elem._id === id)
        this.data[index] = product;
        return product;        
    }

    delete = async(pid) => {
        const index = this.data.findIndex((elem) => elem.id === pid);
    
        const deletedProduct = this.data.splice(index, 1)[0];
        return deletedProduct;  
        };
}
