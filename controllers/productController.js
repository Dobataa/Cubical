const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.render('home', { title: 'Browse'});
});

router.get('/create', (req, res) => {
    res.render('home', { title: 'Create'});
});

module.exports = router;