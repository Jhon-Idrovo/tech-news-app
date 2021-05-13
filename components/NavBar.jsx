import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

function NavBar({ section, changeSection }) {
  const [isDark, setisDark] = useState(true);
  const handleClick = () => {
    let nodeEl = document.getElementsByTagName("html")[0];
    nodeEl.className = isDark ? "dark" : "";
    setisDark(!isDark);
  };

  return (
    <nav className=" w-full bg-primary dark:bg-primary-dark ">
      <div className="flex justify-end items-center p-2 ">
        <label
          className="dark:text-txt-primary-dark mr-1"
          htmlFor="toggler-check"
        >
          Night Mode
        </label>
        <div
          className={`toggler ${isDark ? "active" : ""}`}
          onClick={handleClick}
        ></div>
      </div>
      <ul className="grid grid-cols-3">
        <li
          onClick={() => {
            changeSection("topstories");
          }}
          className={`nav-tab  ${
            section === "topstories" ? "tab-active" : ""
          } `}
        >
          Top
        </li>
        <li
          onClick={() => {
            changeSection("newstories");
          }}
          className={`nav-tab  ${
            section === "newstories" ? "tab-active" : ""
          } `}
        >
          New
        </li>
        <li
          onClick={() => {
            changeSection("beststories");
          }}
          className={`nav-tab  ${
            section === "beststories" ? "tab-active" : ""
          } `}
        >
          Best
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
