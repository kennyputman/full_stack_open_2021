const listHelper = require("../utils/list_helper");
const helper = require("./test_helper");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  const emptyList = [];

  const listWithOneBlog = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0,
    },
  ];

  test("of empty list is zero", () => {
    const result = listHelper.totalLikes(emptyList);
    expect(result).toBe(0);
  });

  test("when list has only one blog equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(7);
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalLikes(helper.initialBlogs);
    expect(result).toBe(36);
  });
});

describe("favorite blog", () => {
  test("returns blog with most likes", () => {
    const result = listHelper.favoriteBlog(helper.initialBlogs);
    const favoriteBlogFormatted = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    };
    expect(result).toEqual(favoriteBlogFormatted);
  });
});

describe("most blogs", () => {
  test("returns author with largest number of blogs", () => {
    const result = listHelper.mostBlogs(helper.initialBlogs);
    const mostBlogsFormatted = {
      author: "Robert C. Martin",
      blogs: 3,
    };
    expect(result).toEqual(mostBlogsFormatted);
  });
});

describe("most likes", () => {
  test("returns author with most total likes", () => {
    const result = listHelper.mostLikes(helper.initialBlogs);
    const mostLikesFormatted = {
      author: "Edsger W. Dijkstra",
      likes: 17,
    };
    expect(result).toEqual(mostLikesFormatted);
  });
});
