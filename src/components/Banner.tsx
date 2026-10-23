import { useEffect, useState } from "react";
import "./styles/Banner.css";

const ROLES = [
  "Python AI Developer",
  "AI Systems Builder",
  "Full Stack Engineer",
];

const Banner = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const currentText = ROLES[currentTextIndex];

    if (!isDeleting) {
      if (displayedText.length < currentText.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(currentText.slice(0, displayedText.length + 1));
        }, typingSpeed);
        return () => clearTimeout(timeout);
      }
      const timeout = setTimeout(() => {
        setIsDeleting(true);
        setTypingSpeed(50);
      }, 2000);
      return () => clearTimeout(timeout);
    }

    if (displayedText.length > 0) {
      const timeout = setTimeout(() => {
        setDisplayedText(currentText.slice(0, displayedText.length - 1));
      }, typingSpeed);
      return () => clearTimeout(timeout);
    }

    setIsDeleting(false);
    setTypingSpeed(100);
    setCurrentTextIndex((prev) => (prev + 1) % ROLES.length);
  }, [displayedText, isDeleting, currentTextIndex, typingSpeed]);

  return (
    <section id="home" className="banner">
      <div className="container banner__inner">
        <div className="banner__top">
          <div className="banner__avatar-wrap">
            <div className="banner__hello banner__hello--mobile">
              <img
                src="/figma/arrow.png"
                alt=""
                className="banner__arrow banner__arrow--mobile"
              />
              <p>
                Hello! I Am <span>Partima Jain</span>
              </p>
            </div>
            <div className="banner__avatar">
              <div className="banner__avatar-glow" aria-hidden />
              <div className="banner__avatar-clip">
                <img
                  src="/images/partima-formal.png"
                  alt="Partima Jain"
                  className="banner__avatar-photo"
                />
              </div>
            </div>
          </div>

          <div className="banner__copy">
            <div className="banner__hello banner__hello--desktop">
              <img
                src="/figma/arrow.png"
                alt=""
                className="banner__arrow"
              />
              <p>
                Hello! I Am <span>Partima Jain</span>
              </p>
            </div>
            <p className="banner__kicker">An AI Developer who</p>
            <h1>
              Ships systems
              <br />
              that{" "}
              <span className="banner__circle-word">
                <img src="/figma/circle.png" alt="" />
                <span className="gradient-text">scale</span>
              </span>
              ...
            </h1>
            <p className="banner__sub">
              Because if the product doesn&apos;t work in production, what else
              matters?
            </p>
          </div>
        </div>

        <div className="banner__bottom">
          <p className="banner__role">
            I&apos;m a {displayedText}
            <span className="banner__caret">|</span>
          </p>
          <p className="banner__current">
            Currently, I&apos;m an AI Developer at <span>Stulink</span>
          </p>
          <p className="banner__bio">
            Python AI Developer building production-grade backends, RAG
            pipelines, NLP APIs, voice &amp; chat AI, computer vision reports,
            and automation tools - with FastAPI, OpenAI/Gemini, and vector
            search across real products.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Banner;
