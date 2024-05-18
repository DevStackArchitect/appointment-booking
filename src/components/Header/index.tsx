import styles from "./styles.module.scss";
import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className={styles.wrapper}>
      <div className={styles.container}>
        <img
          src="/images/i_company_logo.png"
          alt="logo"
          className={styles.logo}
        />
        <img
          src="/images/hamburger-menu.svg"
          alt=""
          className={styles.mobileHam}
        />
        <ul className={styles.navList}>
          <li>
            <Link to="/">
              Menu{" "}
              <img
                src="/images/chevron-down.svg"
                alt=""
                className={styles.arrow}
              />
            </Link>
          </li>
          <li>
            <Link to="/">Contact us</Link>
          </li>
          <li>
            <button>
              <img src="/images/external-link.svg" alt="" />
              Share Link
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};
export default Header;
