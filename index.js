const express = require('express');
const userRouter = require('./routers/users');
const productsRouter = require('./routers/product');
const invoiceRo = require('./routers/invoice');
const cookieParser = require('cookie-parser'); 
require("dotenv").config()


// Middleware

const app = express();
app.use(express.json());
app.use(cookieParser())
const port = process.env.PORT ?? 1234;
app.disable('x-powered-by', 'set-cookie');

// ROUTERES
app.use('/users', userRouter);
app.use('/invoice', invoiceRo);
app.use('/products', productsRouter);


// SERVER OPENED
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});