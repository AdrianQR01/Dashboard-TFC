import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Create Users
  const users = await Promise.all(
    Array.from({ length: 0 }).map(async () => {
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

  // Create Clients
  const clients = await Promise.all(
    Array.from({ length: 10 }).map(async () => {
      return prisma.cliente.create({
        data: {
          nombre: faker.person.firstName(),
          apellido: faker.person.lastName(),
          email: faker.internet.email(),
          profile_pic: faker.image.avatar(),
          telefono: faker.phone.number(),
        },
      });
    })
  );

  // Create Presupuestos
  const presupuestos = await Promise.all(
    clients.map(async (client) => {
      return prisma.presupuesto.create({
        data: {
          cantidad: parseFloat(faker.finance.amount({ min: 100, max: 10000 })),
          clienteId: client.id,
        },
      });
    })
  );

  // Create Eventos and Servicios
  const eventos = await Promise.all(
    clients.map(async (client) => {
      const evento = await prisma.evento.create({
        data: {
          nombre: faker.lorem.words(3),
          fecha: faker.date.future(),
          aforoMaximo: faker.number.int({ min: 50, max: 500 }),
          precioEntrada: parseFloat(faker.finance.amount({ min: 10, max: 100 })),
          clienteId: client.id,
        },
      });

      const servicios = await Promise.all(
        Array.from({ length: 3 }).map(async () => {
          return prisma.servicio.create({
            data: {
              nombre: faker.commerce.productName(),
              descripcion: faker.commerce.productDescription(),
              precio: faker.commerce.price(),
              eventoId: evento.id,
            },
          });
        })
      );

      const artistas = await Promise.all(
        Array.from({ length: 3 }).map(async () => {
          return prisma.artista.create({
            data: {
              nombre: faker.person.fullName(),
              eventoId: evento.id,
            },
          });
        })
      );

      return { evento, servicios, artistas };
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
