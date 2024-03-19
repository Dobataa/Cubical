const { Router } = require('express');
const productService = require('../services/productService');
const accessoryService = require('../services/accessoryService');
const isAuthenticated = require('../middlewares/isAuthenticated');

const router = Router();

router.get('/', (req, res) => {
    productService.getAll(req.query)
        .then(products => {
            res.render('home', { title: 'Browse', products });
        })
        .catch(() => res.status(500).end());
});

router.get('/create', isAuthenticated, (req, res) => {
    res.render('create', { title: 'Create' });
});

router.post('/create', isAuthenticated, (req, res) => {
    productService.create(req.body)
        .then(() => res.redirect('/products'))
        .catch(() => res.status(500).end());
});

router.get('/details/:productId', async (req, res) => {
    let product = await productService.getByIdWithAccessories(req.params.productId);

    res.render('details', { title: 'Details', product });
});

router.get('/:productId/attach', isAuthenticated, async (req, res) => {
    let product = await productService.getById(req.params.productId);
    let accessories = await accessoryService.getAllWithout(product.accessories);

    res.render('attachAccessory', {product, accessories});
});

router.post('/:productId/attach', isAuthenticated, (req, res) => {
    productService.attachAccessory(req.params.productId, req.body.accessory)
        .then(() => res.redirect(`/products/details/${req.params.productId}`))
        .catch(() => res.status(500).end());
    
});

module.exports = router;