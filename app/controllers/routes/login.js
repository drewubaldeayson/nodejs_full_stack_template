var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('./layouts/login', {
        title: 'Login',
        layout: false
    })
});

router.post('/', function (req, res, next) {
    res.redirect("dashboard")
});

module.exports = router;


