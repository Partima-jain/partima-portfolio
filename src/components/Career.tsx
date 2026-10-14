import { useState } from "react";
import "./styles/Career.css";

const ROLES = [
  {
    title: "AI Developer Engineer",
    company: "Stulink Private Limited · Remote",
    when: "NOW",
    summary:
      "Building intelligent AI-driven features and scalable backend infrastructure. Designing LLM-powered workflows, integrating NLP and generative AI into core products.",
  },
  {
    title: "Python AI Developer",
    company: "Perimattic · Remote",
    when: "Jun – Nov 2025",
    summary:
      "FastAPI AI backends with 30% faster responses. Resume parsing at 95%+ accuracy. OpenAI & Gemini integrations for automated insights.",
  },
  {
    title: "Full Stack Developer",
    company: "Onebanc Technologies · Gurugram",
    when: "Aug 2024 – May 2025",
    summary:
      "Secure responsive apps (+15% engagement). REST APIs, databases, JWT auth, CI/CD - latency and bugs down 20%.",
  },
  {
    title: "Full Stack Developer",
    company: "Webistic · Remote",
    when: "Apr – Jul 2024",
    summary:
      "Python (Django/Flask), React, and JavaScript apps. Database optimisation, UX improvements, cloud CI/CD deployments.",
  },
];

const Career = () => {
  const [open, setOpen] = useState(0);

  return (
    <div className="career-section section-container">
      <div className="career-container">
        <p className="section-label">Experience</p>
        <h2>
          Career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          {ROLES.map((role, index) => (
            <div
              className={`career-info-box${open === index ? " is-open" : ""}`}
              key={`${role.title}-${role.when}`}
              onMouseEnter={() => setOpen(index)}
              onClick={() => setOpen(index)}
            >
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{role.title}</h4>
                  <h5>{role.company}</h5>
                </div>
                <h3>{role.when}</h3>
              </div>
              <p>{role.summary}</p>
            </div>
          ))}
        </div>

        <div className="education-block">
          <p className="section-label">Education</p>
          <div className="education-list">
            <div className="education-item">
              <span className="education-years">2021 – 2025</span>
              <div>
                <h4>BTech in AI &amp; ML</h4>
                <p>CGC University · CGPA 8.6/10.0</p>
              </div>
            </div>
            <div className="education-item">
              <span className="education-years">2021</span>
              <div>
                <h4>Higher Secondary (Class XII)</h4>
                <p>CBSE</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
