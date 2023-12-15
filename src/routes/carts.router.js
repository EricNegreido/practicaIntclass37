import { Router } from "express";
import { getCart, addCart, addCartProduct, updateCartProduct, deleteCart, deleteCartProduct, cartPurchaser} from "../controllers/carts.controller.js";
import toAsyncRouter from "async-express-decorator";

const router = toAsyncRouter(Router());



router.get('/:cid', getCart);

router.post('/', addCart);

router.post("/:cid/products/:pid", addCartProduct);

router.put("/:cid/products/:pid", updateCartProduct);

router.delete("/:cid/products/:pid", deleteCartProduct);

router.delete("/:cid", deleteCart);

router.get("/:cid/purchaser",cartPurchaser);

export default router;