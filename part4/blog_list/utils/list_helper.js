const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (total, blogPost) => {
    return total + blogPost.likes;
  };

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

module.exports = {
  dummy,
  totalLikes,
};
