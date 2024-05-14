import { Authenticator, AuthorizationError } from "remix-auth"
import { sessionStorage } from "./session.server"
import { FormStrategy } from "remix-auth-form"
import db from "./db"
import { Usuario } from "@prisma/client"

const authenticator = new Authenticator<Usuario>(sessionStorage)

const formStrategy = new FormStrategy(async ({form}) => {
    const email_data = form.get("email") as string
    const password = form.get("password") as string

    const user = await db.usuario.findUnique({
        where: {
            email: email
        },
    });
    
})

