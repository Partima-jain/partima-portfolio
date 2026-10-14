import "./styles/AboutSkills.css";

const SKILL_GROUPS = [
  {
    label: "Languages",
    items: ["Python", "JavaScript"],
  },
  {
    label: "AI & LLM Engineering",
    items: [
      "LLM Applications",
      "AI Agents",
      "Agentic Workflows",
      "RAG",
      "Prompt Engineering",
      "Function Calling",
      "Tool Use",
      "OpenAI",
      "Anthropic Claude",
      "Google Gemini",
      "HuggingFace Transformers",
    ],
  },
  {
    label: "Machine Learning",
    items: [
      "PyTorch",
      "Scikit-learn",
      "Deep Learning",
      "NLP",
      "Feature Engineering",
      "Model Evaluation",
    ],
  },
  {
    label: "Computer Vision",
    items: [
      "OpenCV",
      "MediaPipe",
      "Palm / Face Analysis",
      "Image Processing",
      "Vision-based AI",
      "Image Report Generation",
    ],
  },
  {
    label: "RAG & Vector Search",
    items: [
      "FAISS",
      "Pinecone",
      "Semantic Search",
      "Vector Databases",
      "Embedding Pipelines",
      "Chunking",
      "Retrieval Pipelines",
    ],
  },
  {
    label: "Voice & Conversational AI",
    items: [
      "LiveKit",
      "Deepgram STT",
      "Sarvam AI TTS",
      "Twilio",
      "Real-time Voice AI",
      "AI Call Systems",
      "WebSockets",
    ],
  },
  {
    label: "AI Automation & Agents",
    items: [
      "n8n",
      "AI Agent Workflows",
      "Workflow Automation",
      "Webhooks",
      "API Integrations",
      "Automated Pipelines",
    ],
  },
  {
    label: "Backend & APIs",
    items: [
      "FastAPI",
      "Flask",
      "Django",
      "REST APIs",
      "OAuth2",
      "JWT",
      "Async APIs",
    ],
  },
  {
    label: "Databases",
    items: ["PostgreSQL", "MongoDB", "MySQL", "Redis"],
  },
  {
    label: "Data & Processing",
    items: [
      "Pandas",
      "NumPy",
      "PyMuPDF",
      "python-docx",
      "Structured Extraction",
      "PDF Generation",
    ],
  },
  {
    label: "Web Automation",
    items: ["Playwright", "Selenium", "BeautifulSoup", "Web Scraping"],
  },
  {
    label: "Frontend",
    items: ["React.js", "JavaScript", "HTML", "CSS"],
  },
  {
    label: "DevOps & Cloud",
    items: ["Docker", "Git", "CI/CD", "AWS", "Azure", "Postman", "ngrok"],
  },
];

const EDUCATION = [
  {
    years: "2021 – 2025",
    title: "BTech in AI & ML",
    detail: "CGC University · CGPA 8.6/10.0",
  },
  {
    years: "2021",
    title: "Higher Secondary (Class XII)",
    detail: "CBSE",
  },
];

const ACHIEVEMENTS = [
  "Completed workshops on Robotics and Embedded Systems",
  "Attended sessions on Generative AI in Bioinformatics",
  "Coordinator for Engineers’ Day 2023",
  "Finalist at National Level IDEATHON 2024",
];

const AboutSkills = () => {
  return (
    <section id="about" className="about-skills section-pad">
      <div className="container">
        <div className="about-skills__intro">
          <h2>Skills & Expertise</h2>
          <p>
            Looking to join a <span>cross-functional team</span> that values
            shipping reliable AI products people actually use.
          </p>
        </div>

        <div className="about-skills__groups">
          {SKILL_GROUPS.map((group) => (
            <div className="about-skills__group" key={group.label}>
              <h3>{group.label}</h3>
              <div className="about-skills__grid">
                {group.items.map((skill) => (
                  <span className="about-skills__chip" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="about-skills__lower">
          <div className="about-skills__education">
            <h3>Education</h3>
            <div className="about-skills__edu-list">
              {EDUCATION.map((item) => (
                <div className="about-skills__edu-item" key={item.title}>
                  <span>{item.years}</span>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="about-skills__achievements">
            <h3>Certifications & Achievements</h3>
            <ul>
              {ACHIEVEMENTS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSkills;
