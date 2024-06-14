import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Create Users
  const users = await Promise.all(
    Array.from({ length: 1 }).map(async () => {
      return prisma.usuario.create({
        data: {
          name: faker.person.firstName(),
          surname: faker.person.lastName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
        },
      });
    })
  );

  // Create Clients for each User
  const clients = await Promise.all(
    users.flatMap((user) => 
      Array.from({ length: 2 }).map(async () => {
        return prisma.cliente.create({
          data: {
            nombre: faker.person.firstName(),
            apellido: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            telefono: faker.phone.number(),
            usuarioId: user.id,
            sexo: faker.person.sex()
          },
        });
      })
    )
  );

  // Create Events, Services, Budgets, and ClientEvent relations for each User
  await Promise.all(
    users.map(async (user) => {
      const events = await Promise.all(
        Array.from({ length: 2 }).map(async () => {
          const evento = await prisma.evento.create({
            data: {
              nombre: faker.lorem.words(3),
              fecha: faker.date.future(),
              ubicacion: faker.location.city(),
              descripcion: faker.lorem.sentence(),
              estadoEvento: "En progreso",
              usuarioId: user.id,
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
                  usuarioId: user.id,
                },
              });
            })
          );

          const presupuesto = await prisma.presupuesto.create({
            data: {
              total: parseFloat(faker.finance.amount({ min: 1000, max: 10000 })),
              nombrePresupuesto: faker.commerce.productName(),
              estado: "Pendiente",
              fechaInicio: faker.date.past(),
              fechaFin: faker.date.future(),
              eventoId: evento.id,
              usuarioId: user.id,
            },
          });

          await Promise.all(
            Array.from({ length: 2 }).map(async () => {
              const client = clients.find(client => client.usuarioId === user.id);
              const ordenDeEntrada = await prisma.ordenDeEntrada.create({
                data: {
                  cantidad: faker.number.int({ min: 1, max: 5 }),
                  precio: parseFloat(faker.commerce.price()),
                  clienteId: client.id,
                  eventoId: evento.id,
                  usuarioId: user.id,
                },
              });

              await Promise.all(
                Array.from({ length: ordenDeEntrada.cantidad }).map(async () => {
                  return prisma.entrada.create({
                    data: {
                      precio: ordenDeEntrada.precio,
                      estadoEntrada: "En progreso",
                      ordenDeEntradaId: ordenDeEntrada.id,
                      eventoId: evento.id,
                      usuarioId: user.id,
                    },
                  });
                })
              );

              // Create ClientEvento relation
              await prisma.clienteEvento.create({
                data: {
                  clienteId: client.id,
                  eventoId: evento.id,
                  usuarioId: user.id,
                },
              });
            })
          );

          return { evento, servicios, presupuesto };
        })
      );
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
