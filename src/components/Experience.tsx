import "./styles/Experience.css";

const CARDS = [
  {
    title: "Stulink - AI Developer",
    description:
      "Building AI for Pandit AI - real-time call/chat systems, palm & face analysis with OpenCV, LLM-powered astrology Q&A, and personalised PDF report pipelines for iOS/Android.",
    tag: "Dec 2025 – Present · Remote",
    icon: "AI",
  },
  {
    title: "Perimattic - Python AI Developer",
    description:
      "FastAPI AI backends with 30% faster responses, resume parsing at 95%+ accuracy, Gemini/OpenAI integrations, and fine-tuning that improved prediction reliability by 20%.",
    tag: "Jun 2025 – Dec 2025 · Remote",
    icon: "PY",
  },
  {
    title: "Onebanc - Full Stack Developer",
    description:
      "Secure responsive web apps (+15% engagement), Python REST APIs (−20% latency), MySQL/PostgreSQL/MongoDB tuning, JWT auth, and CI/CD - bugs down 20%.",
    tag: "Aug 2024 – May 2025 · Gurugram",
    icon: "FS",
  },
  {
    title: "Webistic - Full Stack Developer",
    description:
      "Python (Django/Flask) + React apps, database optimisation, UX improvements, Agile delivery, and AWS/Heroku deployments with CI/CD.",
    tag: "Apr 2024 – Jul 2024 · Remote",
    icon: "WEB",
  },
  {
    title: "Python Programmer - Training",
    description:
      "Intensive Python training covering OOP and data structures. Built parsing scripts, automation tools, and API integrations with Pandas, NumPy, and Requests.",
    tag: "Apr 2023 – May 2023",
    icon: "TR",
  },
];

const Experience = () => {
  return (
    <section id="experience" className="experience section-pad">
      <div className="container">
        <h2>Work Experience</h2>
        <div className="experience__grid">
          {CARDS.map((card) => (
            <article className="experience__card" key={card.title}>
              <div className="experience__icon" aria-hidden>
                <span>{card.icon}</span>
              </div>
              <div className="experience__body">
                <p className="experience__tag">{card.tag}</p>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <a href="#work">LEARN MORE →</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
