import Errors from "./enums.js";

export default (error, req, res, next) => {
    req.logger.error(error);
    switch(error.code){
        case Errors.INVALID_TYPE_ERROR:
            res.status(400).send({
                status:'error',
                error:error.name,
                description:error.cause
            })
            break;
        case Errors.CART_NOT_FOUND:
            res.status(404).send({
                status:'error',
                error:error.name,
                description:error.cause
            })
            break;
        case Errors.PRODUCT_NOT_FOUND:
            res.status(404).send({
                status:'error',
                error:error.name,
                description:error.cause
            });
            break;
        default:
            res.status(500).send({
                status:'error',
                error:error.name,
                description:error.cause
            })
            break;
    }
}