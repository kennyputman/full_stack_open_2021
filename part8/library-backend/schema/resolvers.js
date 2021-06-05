const { UserInputError, AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");

const config = require("../utils/config");
const Book = require("../models/book");
const Author = require("../models/author");
const User = require("../models/user");

const JWT_SECRET = config.JWT_SECRET;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({}).populate("author");

      if (!args.author && !args.genre) {
        return books;
      }

      let booksFiltered = books;

      if (args.author) {
        booksFiltered = booksFiltered.filter(
          (book) => book.author.name === args.author
        );
      }
      if (args.genre) {
        booksFiltered = booksFiltered.filter((book) =>
          book.genres.includes(args.genre)
        );
      }

      return booksFiltered;
    },
    allAuthors: async () => {
      const authors = await Author.find({}).lean();

      const authorsWithCount = authors.map((author) => {
        const authorBookCount = author.books.length;
        return { ...author, id: author._id, bookCount: authorBookCount };
      });

      return authorsWithCount;
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      const authorExists = await Author.findOne({ name: args.author });

      if (authorExists) {
        const book = new Book({ ...args, author: authorExists._id });

        await book.save().catch((error) => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        });

        const author = await Author.findById(authorExists._id);
        author.books = author.books.concat(book._id);
        author.save().catch((error) => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        });

        result = await Book.findById(book._id).populate("author");
        return result;
      } else if (authorExists == null) {
        const author = new Author({ name: args.author });
        await author.save().catch((error) => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        });
        const book = new Book({ ...args, author: author._id });
        await book.save().catch((error) => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        });

        author.books = author.books.concat(book._id);
        author.save().catch((error) => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        });

        result = await Book.findById(book._id).populate("author");
        return result;
      }
    },

    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      const author = await Author.findOne({ name: args.name });
      if (!author) {
        throw new UserInputError("Author is not found");
      }
      author.born = args.setBornTo;
      try {
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return author;
    },
    createUser: (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
};

module.exports = resolvers;
