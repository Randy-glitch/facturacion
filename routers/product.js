const express = require('express');
// const jwt = require('jsonwebtoken');
const platos = require('../data/platos.json');
const verifyToken = require('../controllers/verifyToken');
// const invoices = require("../data/invoice.json")


const router = express.Router();

router.get('/', verifyToken, (req, res) => {
    // const token = req.cookies.token
    // console.log(token)
    res.status(200).json({platos})
})


module.exports = router;
