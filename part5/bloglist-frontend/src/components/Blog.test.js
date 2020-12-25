import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import Blog from "./Blog";

describe("Blog renders Title and Author only", () => {
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

  test("Blog renders Title and Author", () => {
    const blogHeader = component.container.querySelector(".blogHeader");

    // console.log(prettyDOM(blogHeader));

    expect(blogHeader).toHaveTextContent(
      "JS Engine Visualzied: by Lydia Hallie"
    );
  });

  test("extra info is hidden by default", () => {
    const extraInfo = component.container.querySelector(".extraInfo");

    console.log(prettyDOM(extraInfo));

    expect(extraInfo).toHaveStyle("display: none");
  });
});
