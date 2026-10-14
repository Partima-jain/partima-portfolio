import { useEffect, useRef, useState } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PANELS = [
  {
    title: "Develop",
    subtitle: "Backend & Full-Stack",
    body: "Scalable REST APIs, microservices, and full-stack apps - performance, security, and clean architecture from database to CI/CD.",
    tags: [
      "Python",
      "FastAPI",
      "Django",
      "Flask",
      "React.js",
      "PostgreSQL",
      "MongoDB",
      "Docker",
      "AWS",
      "CI/CD",
    ],
  },
  {
    title: "AI & ML",
    subtitle: "LLMs & Intelligent Systems",
    body: "Production AI pipelines - NLP, semantic search, RAG, and generative systems with accuracy and reliability as the default.",
    tags: [
      "OpenAI / Gemini",
      "LangChain",
      "RAG",
      "Pinecone",
      "HuggingFace",
      "NLP",
      "spaCy",
      "Transformers",
      "Agents",
    ],
  },
];

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };

  useEffect(() => {
    if (ScrollTrigger.isTouch) {
      containerRef.current.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          container.addEventListener("click", () => handleClick(container));
        }
      });
    }
    return () => {
      containerRef.current.forEach((container) => {
        if (container) {
          container.removeEventListener("click", () => handleClick(container));
        }
      });
    };
  }, []);

  const onMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    setActive(index);
  };

  return (
    <div className="whatIDO">
      <div className="what-box">
        <p className="section-label">Capabilities</p>
        <h2 className="title">
          What
          <div>
            I <span className="do-h2">Do</span>
          </div>
        </h2>
        <p className="what-lead">
          Hover a panel to explore how I build and ship.
        </p>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="6,8"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="6,8"
              />
            </svg>
          </div>
          {PANELS.map((panel, index) => (
            <div
              className={`what-content what-noTouch${active === index ? " is-hot" : ""}`}
              ref={(el) => setRef(el, index)}
              key={panel.title}
              onMouseMove={(e) => onMove(e, index)}
              onMouseEnter={() => setActive(index)}
            >
              <div className="what-spotlight" />
              <div className="what-border1">
                <svg height="100%">
                  <line
                    x1="0"
                    y1={index === 0 ? "0" : "100%"}
                    x2="100%"
                    y2={index === 0 ? "0" : "100%"}
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="6,8"
                  />
                  {index === 0 && (
                    <line
                      x1="0"
                      y1="100%"
                      x2="100%"
                      y2="100%"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeDasharray="6,8"
                    />
                  )}
                </svg>
              </div>
              <div className="what-corner"></div>
              <div className="what-content-in">
                <div className="what-index">0{index + 1}</div>
                <h3>{panel.title}</h3>
                <h4>{panel.subtitle}</h4>
                <p>{panel.body}</p>
                <h5>Skillset & tools</h5>
                <div className="what-content-flex">
                  {panel.tags.map((tag) => (
                    <div className="what-tags" key={tag}>
                      {tag}
                    </div>
                  ))}
                </div>
                <div className="what-arrow"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);

    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
