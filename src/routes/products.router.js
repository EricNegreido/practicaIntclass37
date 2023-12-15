import { Router } from "express";
import { getProducts, getProductId, addProduct, updateProduct, deleteProduct } from "../controllers/products.controller.js";
import toAsyncRouter from "async-express-decorator";
import { passportCall } from "../utils.js";


const router = toAsyncRouter(Router());



router.get('/', passportCall('jwt'), getProducts, );

router.get('/:id',getProductId);

router.post('/', addProduct);

router.put('/:id', updateProduct);

router.get('/admin', getProducts);

router.delete('/:id', deleteProduct);


export default router;