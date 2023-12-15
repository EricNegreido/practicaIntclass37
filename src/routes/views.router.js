// Rutas que se renderizan !!!!

import { Router } from "express";
import Products from '../dao/dbManagers/products.manager.js'
import Carts from '../dao/dbManagers/carts.manager.js'

const productsManager = new Products(); // CORREGIR

const cartsManager = new Carts();// CORREGIR

const router = Router();

const publicAccess = (req, res, next) =>{
    if(req.user) return res.redirect('/');
    next();
}

const privateAccess = (req, res, next) => {

    if(!req.user) return res.redirect('/login');
    next();

}

// const accessControl = (req, res, next) => { ///CORREGIR
//     console.log(req.user);

//     if (!req.user) return res.redirect('/login');

//     const userRole = req.user.rol;

//     if (userRole === 'Admin') {
//         // Si el usuario es un administrador, redirigir a la ruta de administrador
//         res.redirect('/admin/products');
//     } else if (userRole === 'User') {
//         // Si el usuario es un usuario normal, permitir el acceso a la ruta de usuario
//         next();
//     } else {
//         // Otros casos, por ejemplo, roles desconocidos
//         res.status(403).send('Acceso no autorizado');
//     }
// };

router.get('/register', publicAccess, (req, res) => {
    res.render('register');
});


router.get('/login', publicAccess, (req, res) => {
    res.render('login');
});

router.get('/', privateAccess, (req, res) => {
    res.render('profile', {
        user: req.user
    });
});

router.get('/products', async (req, res) =>{
    const {page = 1 , limit = 5, sort, query} = req.query;


    try{
        const {docs, hasPrevPage, hasNextPage, nextPage, prevPage} = await productsManager.getAll(limit, page, sort, query);
       
        res.render('products', {
            product : docs,
            hasPrevPage,
            hasNextPage,
            nextPage,
            prevPage,
            user: req.user


        }) //renderizo views
    }catch(error){
        console.log(error.message);
        res.status(500).send('ERROR AL CARGAR VIEWS')
    }
});

router.get('/admin/products', async (req, res) =>{
    const {page = 1 , limit = 5, sort, query} = req.query;

    try{
        const {docs, hasPrevPage, hasNextPage, nextPage, prevPage} = await productsManager.getAll(limit, page, sort, query);
       

        res.render('adminproducts', {
            product : docs,
            hasPrevPage,
            hasNextPage,
            nextPage,
            prevPage,
            user: req.user


        }) //renderizo views
    }catch(error){
        console.log(error.message);
        res.status(500).send('ERROR AL CARGAR VIEWS')
    }
});


router.get('/carts/:cid', async (req, res) => {
    const { cid } = req.params;
    try {
        const carts = await cartsManager.getArray(cid);
        const products = carts.products.map(item => item.product); 
        const amount = products.reduce((total, elem) => total + elem.price, 0);
        const purchaser = req.user.email;

        res.render('carts', { products, amount, purchaser }); 
    } catch (error) {
        console.log(error.message);
    }
});
 
export default router;