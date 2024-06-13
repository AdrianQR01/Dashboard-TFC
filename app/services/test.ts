import  db from "./db" // import your extended Prisma Client instance

async function main() {
  const subscription = await db.usuario.subscribe()

  for await (const event of subscription) {
    console.log('New event:', event)
  }
}

main()