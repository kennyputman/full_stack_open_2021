import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import Blog from "./Blog";

let component;
beforeEach(() => {
  const blog = {
    user: { username: "Hellas" },
    likes: 532,
    author: "Lydia Hallie",
    title: "JS Engine Visualzied",
    url: "dev.to/lydiahallie/jsenginevisualized",
  };
  component = render(<Blog blog={blog} />);
});

describe("Blog renders Title and Author only", () => {
  test("Blog renders Title and Author", () => {
    const blogHeader = component.container.querySelector(".blogHeader");

    // console.log(prettyDOM(blogHeader));

    expect(blogHeader).toHaveTextContent(
      "JS Engine Visualzied: by Lydia Hallie"
    );
  });

  test("extra info is hidden by default", () => {
    const extraInfo = component.container.querySelector(".extraInfo");

    expect(extraInfo).toHaveStyle("display: none");
  });
});

describe("Extra Info functionality Works", () => {
  test("Clicking view button displays URL & Likes", () => {
    const button = component.getByText("view");
    fireEvent.click(button);

    const extraInfo = component.container.querySelector(".extraInfo");
    // console.log(prettyDOM(extraInfo));
    expect(extraInfo).toHaveStyle("");
  });

  test("Clicking hide button hides extra info", () => {
    const extraInfo = component.container.querySelector(".extraInfo");
    const view = component.getByText("view");
    const hide = component.getByText("hide");
    fireEvent.click(view);
    fireEvent.click(hide);

    expect(extraInfo).toHaveStyle("display: none");
  });
});
