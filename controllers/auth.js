const { z } = require("zod") 

const registerSchema = z.object({
    user: z.string().min(3),
    email: z.string().email("el email no es valido"),
    password: z.string().min(5, "Debes de ser mayor de 5 digitos")
})
const invoiceSchema = z.object({
    clientName: z.string().min(2),
    food: z.string(),
    cant: z.string()
})

module.exports = {registerSchema, invoiceSchema}