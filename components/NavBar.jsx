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
        <label className="dark:text-txt-primary-dark" htmlFor="toggler-check">
          Night Mode
        </label>
        <div className="relative mx-2  w-12 h-4 bg-base dark:bg-base-dark rounded-full border-opacity-30 border-2 border-solid border-txt-primary dark:border-txt-primary-dark">
          <input
            type="checkbox"
            id="toggler-check"
            className="absolute w-full h-full z-10 opacity-10"
            checked={isDark}
            onChange={handleClick}
          />
          <div className="transition-all w-4 border-primary border-solid border-2 h-full rounded-full bg-txt-base dark:bg-txt-base-dark"></div>
        </div>
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
