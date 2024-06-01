import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Create Clients
  const clients = await Promise.all(
    Array.from({ length: 10 }).map(async () => {
      return prisma.cliente.create({
        data: {
          nombre: faker.person.firstName(),
          apellido: faker.person.lastName(),
          email: faker.internet.email(),
          telefono: faker.phone.number(),
        },
      });
    })
  );

  // Create Events, Services, Budgets and ClientEvent relations
  const eventsData = await Promise.all(
    clients.map(async (client) => {
      const evento = await prisma.evento.create({
        data: {
          nombre: faker.lorem.words(3),
          fecha: faker.date.future(),
          ubicacion: faker.address.city(),
          descripcion: faker.lorem.sentence(),
        },
      });

      await prisma.clienteEvento.create({
        data: {
          clienteId: client.id,
          eventoId: evento.id,
        },
      });

      const servicios = await Promise.all(
        Array.from({ length: 3 }).map(async () => {
          return prisma.servicio.create({
            data: {
              nombre: faker.commerce.productName(),
              descripcion: faker.commerce.productDescription(),
              costo: parseFloat(faker.commerce.price()),
              eventoId: evento.id,
            },
          });
        })
      );

      const presupuesto = await prisma.presupuesto.create({
        data: {
          cantidad: parseFloat(faker.finance.amount({ min: 1000, max: 10000 })),
          moneda: "USD",
          eventoId: evento.id,
        },
      });

      const ordenesDeEntrada = await Promise.all(
        Array.from({ length: 2 }).map(async () => {
          const ordenDeEntrada = await prisma.ordenDeEntrada.create({
            data: {
              cantidad: faker.number.int({ min: 1, max: 5 }),
              precio: parseFloat(faker.commerce.price()),
              clienteId: client.id,
              eventoId: evento.id,
            },
          });

          const entradas = await Promise.all(
            Array.from({ length: ordenDeEntrada.cantidad }).map(async () => {
              return prisma.entrada.create({
                data: {
                  numero: faker.datatype.uuid(),
                  precio: ordenDeEntrada.precio,
                  ordenDeEntradaId: ordenDeEntrada.id,
                  eventoId: evento.id,
                },
              });
            })
          );

          return { ordenDeEntrada, entradas };
        })
      );

      return { evento, servicios, presupuesto, ordenesDeEntrada };
    })
  );

  console.log('Seeding completed successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
