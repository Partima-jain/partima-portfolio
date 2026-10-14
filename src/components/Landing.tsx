import { PropsWithChildren } from "react";
import Magnetic from "./Magnetic";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <div className="landing-intro-inner">
              <p className="landing-eyebrow">
                <span className="landing-live" />
                Available for work
              </p>
              <h1>
                PARTIMA
                <br />
                <span>JAIN</span>
              </h1>
              <p className="landing-support">
                Python AI Developer crafting production systems - APIs, RAG,
                voice agents, and LLM-powered products.
              </p>
              <div className="landing-cta">
                <Magnetic as="a" href="#work" className="btn-primary" data-cursor="disable">
                  Explore work
                  <span className="btn-arrow">→</span>
                </Magnetic>
                <Magnetic as="a" href="#contact" className="btn-ghost" data-cursor="disable">
                  Let&apos;s talk
                </Magnetic>
              </div>
              <div className="landing-stats">
                <div className="landing-stat">
                  <strong>04+</strong>
                  <span>Years building</span>
                </div>
                <div className="landing-stat">
                  <strong>08+</strong>
                  <span>Shipped projects</span>
                </div>
                <div className="landing-stat">
                  <strong>AI</strong>
                  <span>Focus stack</span>
                </div>
              </div>
            </div>
          </div>
          <div className="landing-info">
            <div className="landing-info-inner">
              <h3>Currently</h3>
              <h2 className="landing-info-h2">
                <div className="landing-h2-1">AI Engineer</div>
                <div className="landing-h2-2">Builder</div>
              </h2>
              <h2>
                <div className="landing-h2-info">Builder</div>
                <div className="landing-h2-info-1">AI Engineer</div>
              </h2>
              <p className="landing-info-note">Stulink · Remote</p>
            </div>
          </div>
          <a href="#about" className="landing-scroll" data-cursor="disable">
            <span>Scroll</span>
            <span className="landing-scroll__line" />
          </a>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
