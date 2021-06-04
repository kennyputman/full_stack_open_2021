const { UserInputError } = require("apollo-server");
const Book = require("../models/book");
const Author = require("../models/author");

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      return Book.find({}).populate("author");
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
    allAuthors: async () => {
      const authors = await Author.find({}).lean();

      const authorsWithCount = authors.map((author) => {
        const authorBookCount = author.books.length;
        return { ...author, id: author._id, bookCount: authorBookCount };
      });

      return authorsWithCount;
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      const authorExists = await Author.findOne({ name: args.author });

      if (authorExists) {
        const book = new Book({ ...args, author: authorExists._id });
        await book.save();

        const author = await Author.findById(authorExists._id);
        author.books = author.books.concat(book._id);
        author.save();

        result = await Book.findById(book._id).populate("author");
        return result;
      } else if (authorExists == null) {
        const author = new Author({ name: args.author });
        await author.save();
        const book = new Book({ ...args, author: author._id });
        await book.save();

        author.books = author.books.concat(book._id);
        author.save();

        result = await Book.findById(book._id).populate("author");
        return result;
      }
    },

    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name });
      if (!author) {
        return null;
      }
      author.born = args.setBornTo;
      await author.save();
      return author;
    },
  },
};

module.exports = resolvers;
