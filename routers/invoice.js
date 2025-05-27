const express = require("express")
const platos = require("../data/platos.json")
const invoices = require("../data/invoice.json")
const {invoiceSchema} = require("../controllers/SchemasZod")
const verifyToken = require('../controllers/verifyToken');
// const getZodErrors = require('../utils/zodErrorHelper');


const router = express.Router()

router.post("/create", verifyToken, async (req, res) => {
    const validation = invoiceSchema.partial().safeParse(req.body);
     
    if(!validation.success){
        console.log(validation.error);  // comoplete error
        return res.status(400).json({ errors: validation.error.errors });
    }

    const {clientName, food} = req.body;
    const foodName = food.map(e => e.name)
    const existFood = foodName.every(p => 
        platos.some(pn => {
            if (pn.name === p) {
                return true
            }
        })
    )

    if(!existFood){
        return res.status(400).json({error: "El plato no existe"});
    }
    
    // const total = food.map(data => {
        
    //     data.name
    // })
    
    // const totalPrice = parseInt(existFood.price) * parseInt(cant) 

    // invoices.push({
    //     nombre: clientName, plato: food, cantidad: cant, price: existFood.price, 
    //     total: totalPrice 
    // })

    res.json(invoices)   
})



module.exports = router
    
