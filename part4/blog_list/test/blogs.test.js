const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  const emptyList = [];

  const listWithOneBlog = [
    {
      title: "Do you know these 5 topics in HTML",
      author: "Tharun Shiv",
      url: "https://dev.to/tharunshiv/do-you-know-these-5-topics-in-html-45gn",
      likes: 738,
      id: "5eb488d8fd4ff044ec83129a",
    },
  ];

  const listWithManyBlogs = [
    {
      title: "Do you know these 5 topics in HTML",
      author: "Tharun Shiv",
      url: "https://dev.to/tharunshiv/do-you-know-these-5-topics-in-html-45gn",
      likes: 738,
      id: "5eb488d8fd4ff044ec83129a",
    },
    {
      title: "Things to consider while building a CI/CD pipeline",
      author: "KodeKloud",
      url:
        "https://dev.to/kodekloud/things-to-consider-while-building-a-ci-cd-pipeline-1419",
      likes: 93,
      id: "5eb48ba92920c845dfecffb4",
    },
    {
      title:
        "4 ways to use Generator Functions in JavaScript | Examples | Advantages ",
      author: "Tharun Shiv",
      url:
        "https://dev.to/tharunshiv/4-ways-to-use-generator-functions-in-javascript-examples-advantages-2ohd",
      likes: 84,
      id: "5eb5d9339db384e30c512675",
    },
  ];

  test("of empty list is zero", () => {
    const result = listHelper.totalLikes(emptyList);
    expect(result).toBe(0);
  });

  test("when list has only one blog equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(738);
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalLikes(listWithManyBlogs);
    expect(result).toBe(915);
  });
});
