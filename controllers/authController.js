const { Router } = require('express');
const authService = require('../services/authService');

const isGuest = require('../middlewares/isGuest');
const isAuthenticated = require('../middlewares/isAuthenticated');

const router = Router();

router.get('/login', isGuest, (req, res) => {
    res.render('login');
});

router.post('/login', isGuest, async (req, res) => {
    const { username, password } = req.body;

    try {
        let token = await authService.login({ username, password });

        res.cookie('USER_SESSION', token);
        res.redirect('/products');
    } catch (error) {
        res.render('login', { error });
    }
});

router.get('/register', isGuest, (req, res) => {
    res.render('register');
});

router.post('/register', isGuest, async (req, res) => {
    const { username, password, repeatPassword, email } = req.body;

    if (password !== repeatPassword) {
        res.render('register', { error: { message: 'Invalid data!' } });
        return;
    }

    if (password == '' ||
        repeatPassword == '' ||
        username == '' ||
        email == '') {
        res.render('register', { error: { message: 'Fill all fields!' } });
        return;
    }

    try {
        await authService.register({ username, password, email });

        res.redirect('/auth/login');
    } catch (error) {
        res.render('register', { error });
    }

});

router.get('/logout', isAuthenticated, (req, res) => {
    res.clearCookie('USER_SESSION');
    res.redirect('/products');
});

module.exports = router;