const express = require('express')
const router  = express.Router()

router.get('/', (req, res) => {
    res.render('welcome')
})
router.get('/login', (req, res) => {
    res.render('login')
})
//register page
router.get('/register', (req, res) => {
    res.render('register')
})

router.get('/directory', (req, res) => {
    res.render('corePages/directory')
})

module.exports = router