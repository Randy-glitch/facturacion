const express = require('express');
const bcrypt = require('bcryptjs');
const {registerSchema} = require('../controllers/auth');
const users = require('../data/users');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid')




const router = express.Router();



router.post("/register", async (req, res) => {
    const validation = registerSchema.safeParse(req.body);
    
    if(!validation.success) {
        return res.status(400).json({error: validation.error})
    }   
    
    const { user, email, password } = req.body;
    const usersExits = users.find(e => e.email === email)
    
    if(usersExits) {
        return res.status(400).json({error: "El usuario ya existe"})
    }
    
    const passwordHash = await bcrypt.hash(password, 10)
    const id = uuidv4()
    users.push({index: id, ...{user, email, password: passwordHash}})

    res.json({mensaje: "Registrado", USER: { id, user, email, passwordHash }})
})

router.post("/login", async (req, res) => {
    const validation = await registerSchema.partial().safeParse(req.body);
    
    if(!validation.success) {
        return res.status(400).json({error: validation.error})
    }   
    
    const { email, password } = req.body;
    const usersExits = await users.find(e => e.email === email)
    
    if(!usersExits) {
        return res.status(400).json({error: "User no existe"})
    }

    const deshash = await bcrypt.compare(password, usersExits.password)
    
    if(!deshash) {
        return res.status(400).json({error: "Contraseña incorrecta"})
    }
    
    const token = jwt.sign({email:email, password:password }, process.env.SECRET_KEY, {
        expiresIn: "1h"
    }  )

    if(!token) return res.status(400).json({error: "token no valido"}) 
    res.cookie('token', token, {
        httpOnly: true, // La cookie solo puede ser accedida por el servidor
        secure: false,  // Usa true si estás en HTTPS (en producción)
        maxAge: 3600000, // 1 hora de expiración (en milisegundos)
        sameSite: 'strict', // Para proteger contra CSRF
        }); 
    
    res.json({mensaje: "login correct", USER: {email, password, token}})

    
})
router.get('/logout', (req, res) => {
    
    res.clearCookie('token', {
        httpOnly: true, // La cookie solo puede ser accedida por el servidor
        secure: false,  // Usa true si estás en HTTPS (en producción)
        sameSite: 'strict', // Para proteger contra CSRF
        });
    res.status(200).json({MSG: "USER LOGOUT"})
})

module.exports = router