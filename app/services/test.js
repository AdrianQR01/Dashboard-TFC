// import  db from "./db" // import your extended Prisma Client instance

// async function main() {
//   const subscription = await db.usuario.subscribe()

//   for await (const event of subscription) {
//     console.log('New event:', event)
//   }
// }

// main()

import fetch from 'node-fetch';
import express from 'express';
import db from './db.js';

const app = express()
app.use(express.json());

// Function to subscribe to Prisma events and send POST requests to the Remix endpoint
async function main() {
  const subscription = await db.usuario.subscribe();

  for await (const event of subscription) {
    // Send POST request to the Remix endpoint
    await fetch('http://localhost:5173/test', { // Replace with your actual Remix endpoint URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });
  }
}

// Start the server and subscription
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
});