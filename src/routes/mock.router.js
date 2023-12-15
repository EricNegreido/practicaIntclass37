import { Router } from "express";
import {generateProduct} from '../utils.js'

const router = Router();

router.get('/', (req, res) =>{
    let product = [];
    for(let i=0; i < 100; i++){
        product.push(generateProduct());
    }

    res.send({
        status:'ok',
        counter: product.length,
        data: product
    })
})

export default router