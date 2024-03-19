const { Router } = require('express');
const authService = require('../services/authService');

const router = Router();

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        let token = await authService.login({ username, password });

        console.log(token);
        res.end();
    } catch (error) {
        res.render('login', { error });
    }
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
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

        res.redirect('/login');
    } catch (error) {
        res.render('register', { error });
    }

});

module.exports = router;