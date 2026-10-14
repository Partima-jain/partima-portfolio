import Marquee from "react-fast-marquee";
import "./styles/TechMarquee.css";

const ITEMS = [
  "FastAPI",
  "Python",
  "RAG Pipelines",
  "OpenAI",
  "Gemini",
  "LangChain",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "AWS",
  "NLP",
  "Voice AI",
  "LLM Agents",
  "CI/CD",
];

const TechMarquee = () => {
  return (
    <div className="tech-marquee" aria-hidden>
      <Marquee speed={42} gradient={false} pauseOnHover>
        {ITEMS.map((item) => (
          <span className="tech-marquee__item" key={item}>
            {item}
            <span className="tech-marquee__dot" />
          </span>
        ))}
      </Marquee>
    </div>
  );
};

export default TechMarquee;
