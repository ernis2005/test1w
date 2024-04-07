import React from "react";
import s from "./page.module.scss";
import Link from "next/link";
function Haeder() {
  return (
    <nav className={s.Haeder}>
      <Link href="/" className={s.log}>
        Logo
      </Link>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </nav>
  );
}

export default Haeder;
