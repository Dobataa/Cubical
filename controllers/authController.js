const { Router } = require('express');
const authService = require('../services/authService');

const router = Router();

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const { username, password, repeatPassword, email } = req.body;

    if (password !== repeatPassword) {
        res.render('register', { error: { message: 'Invalid data!' } });
    }

    if (password == '' ||
        repeatPassword == '' ||
        username == '' ||
        email == '') {
        res.render('register', { error: { message: 'Fill all fields!' } });
    }

    try {
        await authService.register({ username, password, email });

        res.redirect('/products');
    } catch (error) {
        res.render('register', { error });
    }

});

module.exports = router;