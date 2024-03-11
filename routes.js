const { Router } = require('express');

const router = Router();

const productController = require('./controllers/productController');
const aboutController = require('./controllers/aboutController');
const accessoryControler = require('./controllers/accesoryController');

router.use('/products', productController);
router.use('/about', aboutController);
router.use('/accessories', accessoryControler)
router.get('*', (req, res) => {
    res.render('404');
}) 


module.exports = router;