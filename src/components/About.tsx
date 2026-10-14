import "./styles/About.css";

const HIGHLIGHTS = [
  { label: "FastAPI", detail: "APIs" },
  { label: "RAG", detail: "Search" },
  { label: "LLMs", detail: "Agents" },
  { label: "Voice AI", detail: "Realtime" },
];

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <p className="section-label">About</p>
        <h3 className="title">I build AI that ships</h3>
        <p className="para">
          Python AI Developer focused on production systems - FastAPI backends,
          LLM workflows, RAG pipelines, and multimodal AI. Clean architecture,
          measurable impact, live products.
        </p>
        <div className="about-highlights">
          {HIGHLIGHTS.map((item) => (
            <button key={item.label} className="about-chip" type="button">
              <strong>{item.label}</strong>
              <span>{item.detail}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
