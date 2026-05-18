import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Work = () => {
  useGSAP(() => {
  let translateX: number = 0;

  function setTranslateX() {
    const box = document.getElementsByClassName("work-box");
    const rectLeft = document
      .querySelector(".work-container")!
      .getBoundingClientRect().left;
    const rect = box[0].getBoundingClientRect();
    const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
    let padding: number =
      parseInt(window.getComputedStyle(box[0]).padding) / 2;
    translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
  }

  setTranslateX();

  let timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".work-section",
      start: "top top",
      end: `+=${translateX}`, // Use actual scroll width
      scrub: true,
      pin: true,
      id: "work",
    },
  });

  timeline.to(".work-flex", {
    x: -translateX,
    ease: "none",
  });

  // Clean up (optional, good practice)
  return () => {
    timeline.kill();
    ScrollTrigger.getById("work")?.kill();
  };
}, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {[
            {
              title: "AI Resume Parser",
              category: "AI · NLP · Backend",
              tools: "FastAPI, Python, spaCy, OpenAI, Gemini, Docker",
            },
            {
              title: "Social Media AI Analytics",
              category: "AI · Data · Full-Stack",
              tools: "FastAPI, YouTube Data API, React, AWS, CI/CD",
            },
            {
              title: "RAG Knowledge Base",
              category: "LLM · Semantic Search",
              tools: "LangChain, Pinecone, OpenAI GPT-4, FastAPI, Python",
            },
            {
              title: "Sentiment Analysis Dashboard",
              category: "NLP · Data Visualisation",
              tools: "HuggingFace Transformers, Pandas, Seaborn, Power BI",
            },
            {
              title: "Secure REST API Platform",
              category: "Backend · DevOps",
              tools: "FastAPI, PostgreSQL, JWT, Docker, GitHub Actions",
            },
            {
              title: "AI Content Generator",
              category: "Generative AI · Full-Stack",
              tools: "OpenAI GPT-4, FastAPI, React.js, AWS, Vite",
            },
          ].map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>
                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage image="/images/placeholder.webp" alt={project.title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
