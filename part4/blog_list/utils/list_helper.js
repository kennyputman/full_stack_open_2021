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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
