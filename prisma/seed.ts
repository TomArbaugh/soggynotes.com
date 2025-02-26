import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";


const prisma = new PrismaClient();

async function seed() {


  // cleanup the existing database
  await prisma.user.deleteMany({
    where: {
      title: {in: ["", "The Salmonberries", "The Pockets Full of Jelly", "Cool Hand"]}
    }
  }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  const hashedPasswordTwo = await bcrypt.hash("CodyDaBest", 10);

  const user = await prisma.user.create({
    data: {
      email: "rachel@remix.run",
      password: {
        create: {
          hash: hashedPassword,
        },
      },
      title: "",
      image: "",
      bio: ""

    },
  });

  await prisma.user.create({
    data: {
      email: "thesalmonberries@gmail.com",
      password: {
        create: {
          hash: hashedPasswordTwo,
        },
      },
      title: "The Salmonberries",
      image: "",
      bio: ""
    }
  });

  await prisma.user.create({
    data: {
      email: "soggynotes@gmail.com",
      password: {
        create: {
          hash: hashedPasswordTwo,
        },
      },
      title: "The Pockets Full of Jelly",
      image: "",
      bio: ""
    }
  });

  await prisma.user.create({
    data: {
      email: "coolhand@email.com",
      password: {
        create: {
          hash: hashedPasswordTwo,
        },
      },
      title: "Cool Hand",
      image: "",
      bio: ""
    }
  });



  await prisma.note.create({
    data: {
      title: "My first note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  await prisma.note.create({
    data: {
      title: "My second note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
