import React from "react";
import { HeaderProps } from "../types";

const Header = ({ courseName }: HeaderProps) => {
  return (
    <div>
      <h2>{courseName}</h2>
    </div>
  );
};

export default Header;
