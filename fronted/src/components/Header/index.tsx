import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";  // Добавляем Link
import "./Header.css";
import imgLogo from "./4-PhotoRoom.png-PhotoRoom.png";

function Header() {
  const navRef = useRef<HTMLDivElement>(null);

  const showNavbar = () => {
    if (navRef.current) {
      navRef.current.classList.toggle("responsive_nav");
    }
  };

  return (
    <header>
      <img className="logo" src={imgLogo} alt="" />
      <nav ref={navRef}>
        <Link to="/">Реальное время</Link>
        <Link to="/interval">Интервал</Link>
        <Link to="/settings">Настройки</Link>
        <Link to="/about">О проекте</Link>
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
}

export default Header;
