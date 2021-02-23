const { max } = require("lodash");
const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (total, blogPost) => {
    return total + blogPost.likes;
  };

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce((mostLikes, current) => {
    return mostLikes.likes > current.likes ? mostLikes : current;
  }, blogs[0].likes);

  formattedBlog = {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
  return formattedBlog;
};

const mostBlogs = (blogs) => {
  const most = _(blogs).countBy("author").entries().max();
  return { author: most[0], blogs: most[1] };
};

const mostLikes = (blogs) => {
  byLikes = _(blogs)
    .groupBy("author")
    .map((objs, author) => ({
      author: author,
      likes: _.sumBy(objs, "likes"),
    }))
    .value();

  const authorWithMostLikes = byLikes.reduce((max, blogger) =>
    max.likes > blogger.likes ? max : blogger
  );

  return authorWithMostLikes;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
