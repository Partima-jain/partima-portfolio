import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import "./styles/ContactFooter.css";

const ContactFooter = () => {
  return (
    <footer id="contact" className="contact-footer">
      <div className="container">
        <div className="contact-footer__intro">
          <h2>Contact</h2>
          <p>
            I&apos;m currently looking to join a cross-functional team that
            values shipping reliable AI products - or have a project in mind?
            Let&apos;s connect.
          </p>
          <a href="mailto:parigarg211@gmail.com">parigarg211@gmail.com</a>
          <a href="tel:+919468405180" className="contact-footer__phone">
            +91 946 840 5180
          </a>
          <a
            href="/Partima_Jain_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-footer__resume"
          >
            Download Resume
          </a>
        </div>

        <div className="contact-footer__social">
          <a
            href="https://github.com/Partima-jain"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/partima-jain/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
        </div>

        <div className="contact-footer__copy">
          <p>© {new Date().getFullYear()} Partima Jain. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
