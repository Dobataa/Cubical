const { Router } = require('express');

const router = Router();

const isAuthenticated = require('./middlewares/isAuthenticated');

const productController = require('./controllers/productController');
const authController = require('./controllers/authController');
const aboutController = require('./controllers/aboutController');
const accessoryControler = require('./controllers/accesoryController');

router.use('/products', productController);
router.use('/auth', authController);
router.use('/about', aboutController);
router.use('/accessories', isAuthenticated, accessoryControler);
router.get('*', (req, res) => {
    res.render('404');
}) 


module.exports = router;