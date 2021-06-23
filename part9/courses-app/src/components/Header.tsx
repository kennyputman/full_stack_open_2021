import React from "react";

interface HeaderProps {
  courseName: string;
}

const Header = ({ courseName }: HeaderProps) => {
  return (
    <div>
      <h2>{courseName}</h2>
    </div>
  );
};

export default Header;
