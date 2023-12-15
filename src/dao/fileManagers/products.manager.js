import express from 'express'
import fs from 'fs/promises'
import path from 'path';
import { v4 as uuidv4 } from 'uuid'; 


export default class Products {
    constructor(){
        this.data = []
        console.log("Working products with Memory");
    }

    getAll = async () => {
        
            const data = await fs.readFile(path.join(__dirname, 'products.json'), 'utf-8');
            const products = JSON.parse(data);

            return products;
    }


    getById = async (pid) => {
   
        const data = await fs.readFile(path.join(__dirname,'products.json'), 'utf-8');
        const products = JSON.parse(data);
        
        const product = products.find(elem => elem.id == pid);
        return product;
    };

    save = async (product) =>{
            

        const newProduct = {
            _id : uuidv4(),
            title,
            desc,
            code,
            price,
            status : true,
            stock,
            category,
        }
        // const data = await fs.readFile(path.join(__dirname,'products.json'), 'utf-8');
        // const products = JSON.parse(data);
        const data = await fs.readFile(path.join(__dirname, 'products.json'), 'utf-8');
        const products = JSON.parse(data) || [];

        products.push(newProduct);
            

        await fs.writeFile(path.join(__dirname, 'products.json'), JSON.stringify(products, null, 2), 'utf-8');
        return newProduct;
    }

    update = async (_id, product) => {

            const data = await fs.readFile( path.join(__dirname,'products.json'), 'utf-8');
            const products = JSON.parse(data); 

            const index = products.findIndex((elem) => elem._id === _id);


            const updateProduct = {
                ...products[index],
                title: product.title,
                desc: product.desc,
                code: product.code,
                price: product.price,
                status: products[index].status === 'true',
                stock: product.stock,
                category: product.cat
            }

            products[index] = updateProduct;

            await fs.writeFile(path.join(__dirname,'products.json'), JSON.stringify(products, null, 2), 'utf-8');

        return updateProduct;
    };

    delete = async(pid) => {

    const data = await fs.readFile( path.join(__dirname,'products.json'), 'utf-8');
    const products = JSON.parse(data); 

    const index = products.findIndex((elem) => elem.id === pid);

    const deletedProduct = products.splice(index, 1)[0];
    await fs.writeFile(path.join(__dirname,'products.json'), JSON.stringify(products, null, 2));
    return deletedProduct;  
    };
}
