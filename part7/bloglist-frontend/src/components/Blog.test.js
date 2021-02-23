import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
// import { prettyDOM } from "@testing-library/dom";
import Blog from "./Blog";
import BlogForm from "./BlogForm";

describe("Blog Component", () => {
  const mockHandler = jest.fn();
  let component;
  beforeEach(() => {
    const blog = {
      user: { username: "Hellas" },
      likes: 532,
      author: "John Smith",
      title: "Testing React",
      url: "dev.to/johnsmith/testingreact",
    };
    component = render(<Blog blog={blog} handleAddLike={mockHandler} />);
  });

  test("renders Title and Author", () => {
    const blogHeader = component.container.querySelector(".blogHeader");

    // console.log(prettyDOM(blogHeader));

    expect(blogHeader).toHaveTextContent("Testing React: by John Smith");
  });

  test("hides extra info by default", () => {
    const extraInfo = component.container.querySelector(".extraInfo");

    expect(extraInfo).toHaveStyle("display: none");
  });

  test("displays URL & Likes when view button is clicked", () => {
    const button = component.getByText("view");
    fireEvent.click(button);

    const extraInfo = component.container.querySelector(".extraInfo");
    // console.log(prettyDOM(extraInfo));
    expect(extraInfo).not.toHaveStyle("display:none");
  });

  test("hides extra info when hide button is clicked", () => {
    const extraInfo = component.container.querySelector(".extraInfo");
    const view = component.getByText("view");
    const hide = component.getByText("hide");
    fireEvent.click(view);
    fireEvent.click(hide);

    expect(extraInfo).toHaveStyle("display: none");
  });
  test("calls event handler twice when like button is clicked twice", () => {
    // const extraInfo = component.container.querySelector(".extraInfo");
    // console.log(prettyDOM(extraInfo));
    const likeButton = component.getByText("like");
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});

describe("New Blog Form", () => {
  const mockAddBlogHandler = jest.fn();
  const mockSetTitle = jest.fn();
  const mockSetAuthor = jest.fn();
  const mockSetUrl = jest.fn();

  let component;
  beforeEach(() => {
    const newBlog = {
      title: "Testing React",
      author: "John Smith",
      url: "dev.to/johnsmith/testingreact",
    };
    component = render(
      <BlogForm
        title={newBlog.title}
        author={newBlog.author}
        url={newBlog.url}
        handleAddBlog={mockAddBlogHandler}
        setTitle={({ target }) => mockSetTitle(target.value)}
        setAuthor={({ target }) => mockSetAuthor(target.value)}
        setUrl={({ target }) => mockSetUrl(target.value)}
      />
    );
  });

  test("submit event handler functions correctly", () => {
    const submit = component.container.querySelector("#submitBlog");

    fireEvent.click(submit);

    expect(mockAddBlogHandler.mock.calls).toHaveLength(1);
  });

  test("has correct form values", () => {
    const newBlog = {
      title: "Testing React",
      author: "John Smith",
      url: "dev.to/johnsmith/testingreact",
    };
    const formAuthor = component.container.querySelector("#author");
    const formTitle = component.container.querySelector("#title");
    const formUrl = component.container.querySelector("#url");

    const formValues = {
      title: formTitle.value,
      author: formAuthor.value,
      url: formUrl.value,
    };

    expect(formValues).toEqual(newBlog);
  });
});
