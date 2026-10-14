import "./styles/Header.css";

const Header = () => {
  return (
    <header className="site-header">
      <nav className="site-header__nav container">
        <a href="#home" className="site-header__logo">
          Partima<span>.</span>
        </a>
        <ul className="site-header__links">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#work">Work</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
          <li>
            <a
              href="/Partima_Jain_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="site-header__resume"
            >
              Resume
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
