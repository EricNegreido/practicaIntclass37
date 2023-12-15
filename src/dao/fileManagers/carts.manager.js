import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid'; 


export default class Carts {
    constructor(){
        console.log("Working Carts with File");
    }

    save = async () => {

        const cart = {
            _id : uuidv4(),
            products:[]
        }
        
        
        const data = await fs.readFile(path.join(__dirname, 'carts.json'), 'utf-8');
        const carts = JSON.parse(data) || [];

        // const initialData = '[]';
        // await fs.writeFile(path.join(__dirname, 'carts.json'), initialData, 'utf-8');
        // carts = JSON.parse(initialData);

        carts.push(cart);
        
        await fs.writeFile(path.join(__dirname, 'carts.json'), JSON.stringify(carts, null, 2), 'utf-8');
        return cart;
    };

    getArray= async (cid) => {

        const data = await fs.readFile(path.join(__dirname, 'carts.json'), 'utf-8');
        const carts = JSON.parse(data);

        const cart = carts.find((elem) => elem.id === cid);

        return cart 
    };

    update = async (id, products) => {
        console.log(products)
    
            const result = await cartsModel.updateOne({_id: id},{products: products});
            console.log(result)
    
            return result
        }

}
