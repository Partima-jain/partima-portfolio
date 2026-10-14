import { MdArrowOutward, MdCopyright } from "react-icons/md";
import Magnetic from "./Magnetic";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <p className="section-label">Contact</p>
        <h3>
          Let&apos;s build
          <br />
          <span>something solid</span>
        </h3>
        <p className="contact-lead">
          Open to AI engineering roles, freelance collaborations, and product
          builds. I usually reply within a day.
        </p>

        <div className="contact-cta">
          <Magnetic
            as="a"
            href="mailto:parigarg211@gmail.com"
            className="contact-mail"
            data-cursor="disable"
            strength={0.2}
          >
            <span>parigarg211@gmail.com</span>
            <MdArrowOutward />
          </Magnetic>
        </div>

        <div className="contact-flex">
          <div className="contact-box">
            <h4>Phone</h4>
            <p>
              <a href="tel:+919468405180" data-cursor="disable">
                +91 946 840 5180
              </a>
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/Partima-jain"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Github <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/partima-jain/"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Linkedin <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box contact-box--credit">
            <h2>
              Designed and developed
              <br /> by <span>Partima Jain</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
