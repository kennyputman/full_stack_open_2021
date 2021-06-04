const { UserInputError } = require("apollo-server");
const Book = require("../models/book");
const Author = require("../models/author");

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      return Book.find({});
      // if (!args.author && !args.genre) {
      //   return books.find({});
      // }
      // let booksFiltered = books;

      // if (args.author) {
      //   booksFiltered = booksFiltered.filter(
      //     (book) => book.author === args.author
      //   );
      // }
      // if (args.genre) {
      //   booksFiltered = booksFiltered.filter((book) =>
      //     book.genres.includes(args.genre)
      //   );
      // }

      // return booksFiltered;
    },
    allAuthors: () => {
      return authors.map((author) => {
        const authorBookCount = books.filter(
          (book) => book.author === author.name
        ).length;

        return { ...author, bookCount: authorBookCount };
      });
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      const authorExists = await Author.findOne({ name: args.author });

      if (authorExists) {
        const book = new Book({ ...args, author: authorExists._id });
        await book.save();
        result = await Book.findById(book._id).populate("author");
        return result;
      } else if (authorExists == null) {
        const author = new Author({ name: args.author });
        await author.save();
        const book = new Book({ ...args, author: author._id });
        await book.save();

        result = await Book.findById(book._id).populate("author");
        return result;
      }
    },

    editAuthor: (root, args) => {
      const author = authors.find((author) => author.name === args.name);

      if (!author) {
        return null;
      }
      const updatedAuthor = { ...author, born: args.setBornTo };

      authors = authors.map((author) =>
        author.id === updatedAuthor.id ? updatedAuthor : author
      );

      return updatedAuthor;
    },
  },
};

module.exports = resolvers;
