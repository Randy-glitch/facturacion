const express = require("express")
const platos = require("../data/platos.json")
const invoices = require("../data/invoice.json")
const {invoiceSchema} = require("../controllers/auth")
const verifyToken = require('../controllers/verifyToken');


const router = express.Router()

router.post("/create", verifyToken, async (req, res) => {
    const validateinvoice = invoiceSchema.partial().parse(req.body)
     
    if(!validateinvoice){  
        return res.status(400).json({error: "El plato no existe"})
    }

    const {clientName, food, cant} = req.body
    const existFood = platos.find(e => e.name === food )   

    if(!existFood){
        return res.status(400).json({error: "El plato no existe"})
    } 
    
    const totalPrice = parseInt(existFood.price) * parseInt(cant) 

    invoices.push({
        nombre: clientName, plato: food, cantidad: cant, price: existFood.price, 
        total: totalPrice 
    })

    res.json(invoices)   
})



module.exports = router
    