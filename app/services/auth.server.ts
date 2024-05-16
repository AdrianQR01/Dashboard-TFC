import { Authenticator, AuthorizationError } from "remix-auth"
import { sessionStorage } from "./session.server"
import { FormStrategy } from "remix-auth-form"
import db from "./db"
import bcrypt from "bcrypt"
import { Usuario } from "@prisma/client"

const authenticator = new Authenticator<Usuario>(sessionStorage)

const formStrategy = new FormStrategy(async ({form}) => {
    const email = form.get("email") as string
    const password = form.get("password") as string

    const user = await db.usuario.findUnique({
        where: {
            email: email
        },
    })

    if (!user) {
        console.log("El email introducido no existe en la BBDD") // ESTO ES PARA DEBUG, BORRAR IMPORTANTE
        throw new AuthorizationError()
    }
    
    const passwordMatch = await bcrypt.compare(password, user.password as string)

    if (!passwordMatch) {
        throw new AuthorizationError()
    }

    return user
})

authenticator.use(formStrategy, "form")

export { authenticator }