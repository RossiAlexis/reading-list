import { PrismaClient } from "@prisma/client";

import books from "../books.json";

const GenresArray = [
  {
    name: "Fantasy",
  },
  {
    name: "Science Fiction",
  },
  {
    name: "Horror",
  },
  {
    name: "Thriller",
  },
];

const prisma = new PrismaClient();

async function seed() {
  // GenresArray.forEach(async (data) => {
  //   await prisma.genre.create({
  //     data,
  //   });
  // });

  books.library.forEach(async (book) => {
    const authorId = await prisma.author.create({
      data: {
        name: book.book.author.name,
      },
    });

    // const authorId = await prisma.author.findFirst({
    //   where: {
    //     name: book.book.author.name,
    //   },
    // });
    try {
      await prisma.book.create({
        data: {
          title: book.book.title,
          authorId: authorId.id,
          cover: book.book.cover,
          ISBN: book.book.ISBN,
          synopsis: book.book.synopsis,
          pages: book.book.pages,
          genreId: book.book.genreId,
        },
      });
    } catch (error) {
      console.log("HOLA", book.book.title, error);
    }
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
