const { Router } = require('express');
const productsService = require('../services/productService');

const router = Router();

router.get('/', (req, res) => {
    let products = productsService.getAll(); 

    res.render('home', { title: 'Browse', products });
});

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create'});
});

router.post('/create', (req, res) => {
    productsService.create(req.body);

    res.redirect('/products');
});

router.get('/details/:productId', (req, res) => {
    let product = productsService.getById(req.params.productId);

    res.render('details', {title: 'Details', product});
});

module.exports = router;