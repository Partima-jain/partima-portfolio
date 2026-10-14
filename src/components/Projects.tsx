import { FiGithub } from "react-icons/fi";
import "./styles/Projects.css";

const PROJECTS = [
  {
    title: "AI Knowledge Assistant",
    category: "RAG · LLM · Semantic Search",
    description:
      "Document Q&A with FastAPI, FAISS, and GPT-4o-mini. Supports PDF/DOCX uploads, cited page references, and sub-second retrieval via semantic chunking and embedding pipelines.",
    tools: "FastAPI, FAISS, OpenAI GPT-4o-mini, PyMuPDF, python-docx",
    image: "/images/proj-knowledge-assistant.png",
    link: "https://github.com/Partima-jain/AI-knowledge-assistant",
  },
  {
    title: "AI Resume Screener",
    category: "AI · NLP · HR Automation",
    description:
      "Parses and scores resumes against a job description using NLP (spaCy) and OpenAI. Ranks applicants by fit score and ships in Docker for production.",
    tools: "FastAPI, spaCy, OpenAI, PyMuPDF, Python, Docker",
    image: "/images/proj-resume-screening.png",
    link: "https://github.com/Partima-jain/Ai-resume-Screening",
  },
  {
    title: "BuildOS - Social Brand AI Platform",
    category: "AI · Data Analytics · Full-Stack",
    description:
      "Personal brand intelligence connecting YouTube and Instagram via OAuth. Real-time Brand Score, virality predictions, and competitor benchmarks with FastAPI + PostgreSQL.",
    tools: "FastAPI, YouTube Data API, Instagram Graph API, PostgreSQL, SendGrid",
    image: "/images/proj-social-analytics.png",
    link: "https://github.com/Partima-jain/Social-media-analyzer",
  },
  {
    title: "Multi-Client RAG Chatbot Engine",
    category: "Generative AI · RAG · SaaS",
    description:
      "White-label chatbot SaaS with dedicated Pinecone indexes per client, Playwright data ingestion, and OpenAI Q&A from a single FastAPI backend.",
    tools: "FastAPI, OpenAI, Pinecone, Playwright, Selenium, Python",
    image: "/images/proj-chatbot-platform.png",
    link: "https://github.com/Partima-jain/automated-chatbot-process",
  },
  {
    title: "StudConnect - University Discovery",
    category: "Full-Stack · EdTech · AI",
    description:
      "EdTech platform for university shortlisting and applications - AI match scores, scholarships, counsellor booking, and OTP auth on FastAPI + PostgreSQL + MongoDB.",
    tools: "FastAPI, PostgreSQL, MongoDB, JWT, OTP Email, React, Python",
    image: "/images/proj-studconnect.png",
    link: "https://github.com/Partima-jain/yournextuniversity-backend",
  },
  {
    title: "AI Phone Voice Assistant",
    category: "Voice AI · Telephony · NLP",
    description:
      "Production voice bot for real phone calls via Twilio - Deepgram STT, Sarvam AI TTS, inbound/outbound handling, and full transcription through FastAPI.",
    tools: "FastAPI, Twilio, Deepgram STT, Sarvam AI TTS, ngrok, Python",
    image: "/images/proj-voice-assistant.png",
    link: "https://github.com/Partima-jain/phone-voice-assistant",
  },
  {
    title: "AI Image Caption Generator",
    category: "Computer Vision · Transformers · GUI",
    description:
      "Desktop captioning app using ViT-GPT2 from HuggingFace - file upload or webcam, GPU/CPU inference, Tkinter UI, no cloud API required.",
    tools: "HuggingFace Transformers, ViT-GPT2, PyTorch, OpenCV, Tkinter, Python",
    image: "/images/proj-image-caption.png",
    link: "https://github.com/Partima-jain/Image-caption-Generator",
  },
  {
    title: "AI Diet Planner",
    category: "Health Tech · AI · Desktop App",
    description:
      "Personalised meal plans from 60+ foods with macros - goals, restrictions, allergies, and CSV history tracking in a Tkinter desktop UI.",
    tools: "Python, Tkinter, CSV, Nutritional Algorithms, OOP",
    image: "/images/proj-diet-planner.png",
    link: "https://github.com/Partima-jain/Ai-Diet-Planner",
  },
];

const Projects = () => {
  return (
    <section id="work" className="projects section-pad">
      <div className="container projects__container">
        <div className="projects__header">
          <h2>Featured Projects</h2>
          <p>All {PROJECTS.length} builds from the portfolio</p>
        </div>
        {PROJECTS.map((project, index) => {
          const isEven = index % 2 === 1;
          return (
            <article
              className={`projects__item${isEven ? " projects__item--reverse" : ""}`}
              key={project.title}
            >
              <div className="projects__content">
                <p className="projects__label">Featured Project</p>
                <h3>{project.title}</h3>
                <p className="projects__category">{project.category}</p>
                <div className="projects__card">
                  <p>{project.description}</p>
                </div>
                <p className="projects__tools">{project.tools}</p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="projects__link"
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <FiGithub size={22} />
                </a>
              </div>
              <div className="projects__media">
                <div className="projects__frame">
                  <img src={project.image} alt={project.title} />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
