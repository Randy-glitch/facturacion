const { z } = require("zod") 

const registerSchema = z.object({
    user: z.string().min(3),
    email: z.string().email("el email no es valido"),
    password: z.string().min(5, "Debes de ser mayor de 5 digitos")
})
const invoiceSchema = z.object({
  clientName: z.string().min(2),
  food: z.array(
    z.object({
      name: z.string().min(1),
      cant: z.string().regex(/^\d+$/, { message: "cant debe ser un número en forma de string" })
    })
  )
});

module.exports = {registerSchema, invoiceSchema}