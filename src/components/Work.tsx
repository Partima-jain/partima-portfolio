import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import { MdArrowForwardIos, MdClose } from "react-icons/md";
import { FiGithub } from "react-icons/fi";
import { smoother } from "./Navbar";

gsap.registerPlugin(useGSAP);

const PROJECTS = [
  {
    title: "AI Knowledge Assistant",
    category: "RAG · LLM · Semantic Search",
    description:
      "Upload any PDF or DOCX and get AI-generated answers grounded in your documents — with cited page references and match scores. Powered by FAISS vector search and GPT-4o-mini for instant, accurate retrieval at scale.",
    tools: "FastAPI, FAISS, OpenAI GPT-4o-mini, PyMuPDF, python-docx",
    image: "/images/proj-knowledge-assistant.png",
    link: "https://github.com/Partima-jain/AI-knowledge-assistant",
  },
  {
    title: "BuildOS · Social Brand AI",
    category: "AI · Data Analytics · Full-Stack",
    description:
      "A full-scale personal brand intelligence platform. Connects to YouTube + Instagram via OAuth, calculates a real-time Brand Score, predicts content virality, suggests optimal posting times, and benchmarks against competitors — all driven by AI.",
    tools: "FastAPI, YouTube Data API, Instagram Graph API, PostgreSQL, SendGrid",
    image: "/images/proj-social-analytics.png",
    link: "https://github.com/Partima-jain/Social-media-analyzer",
  },
  {
    title: "AI Phone Voice Assistant",
    category: "Voice AI · Telephony · NLP",
    description:
      "A production-ready AI voice bot that answers real phone calls via Twilio. Uses Deepgram for real-time speech-to-text and Sarvam AI for natural TTS responses — handling inbound calls, outbound dialling, and full conversation transcripts automatically.",
    tools: "FastAPI, Twilio, Deepgram STT, Sarvam AI TTS, ngrok, Python",
    image: "/images/proj-voice-assistant.png",
    link: "https://github.com/Partima-jain/phone-voice-assistant",
  },
  {
    title: "Multi-Client RAG Chatbot",
    category: "Generative AI · RAG · SaaS",
    description:
      "A white-label AI chatbot engine serving multiple business clients from a single FastAPI backend. Each client gets a dedicated Pinecone vector index for their knowledge base, with Playwright-powered web automation for data ingestion and OpenAI for intelligent Q&A.",
    tools: "FastAPI, OpenAI, Pinecone, Playwright, Selenium, Python",
    image: "/images/proj-chatbot-platform.png",
    link: "https://github.com/Partima-jain/automated-chatbot-process",
  },
  {
    title: "StudConnect Platform",
    category: "Full-Stack · EdTech · AI",
    description:
      "A comprehensive university discovery and application platform. Students get AI-powered shortlists ranked by personalised match scores, scholarship search with smart filters, counsellor booking, and OTP-secured auth — all backed by a production-grade FastAPI + PostgreSQL + MongoDB stack.",
    tools: "FastAPI, PostgreSQL, MongoDB, JWT, OTP Email, React, Python",
    image: "/images/proj-studconnect.png",
    link: "https://github.com/Partima-jain/yournextuniversity-backend",
  },
  {
    title: "AI Resume Screener",
    category: "AI · NLP · HR Automation",
    description:
      "An intelligent recruitment automation tool that parses and scores candidate resumes against a job description in seconds. Extracts skills, experience, and qualifications using NLP, ranks applicants by fit score, and flags top matches — cutting manual screening time drastically.",
    tools: "FastAPI, spaCy, OpenAI, PyMuPDF, Python, Docker",
    image: "/images/proj-resume-screening.png",
    link: "https://github.com/Partima-jain/Ai-resume-Screening",
  },
  {
    title: "AI Image Caption Generator",
    category: "Computer Vision · Transformers · GUI",
    description:
      "A desktop app that auto-generates natural-language captions for any image using a ViT-GPT2 vision-language Transformer from HuggingFace. Supports both file upload and live webcam capture, runs inference on GPU (CUDA) or CPU, and displays results instantly in a Tkinter GUI — no cloud API needed.",
    tools: "HuggingFace Transformers, ViT-GPT2, PyTorch, OpenCV, Tkinter, Python",
    image: "/images/proj-image-caption.png",
    link: "https://github.com/Partima-jain/Image-caption-Generator",
  },
  {
    title: "AI Diet Planner",
    category: "Health Tech · AI · Desktop App",
    description:
      "A personalised nutrition planner that builds calorie-balanced meal plans from a hand-crafted database of 60+ foods with full macro breakdowns (protein, carbs, fats). Takes user weight, height, age, activity level, fitness goal, dietary restrictions, and allergies, then generates a daily meal plan and tracks meal history to a CSV — all through a polished Tkinter desktop UI.",
    tools: "Python, Tkinter, CSV, Nutritional Algorithms, OOP",
    image: "/images/proj-diet-planner.png",
    link: "https://github.com/Partima-jain/Ai-Diet-Planner",
  },
];

// ScrollSmoother is configured with speed: 1.7 in Navbar.
// With that speed the content moves 1.7× faster than the wrapper's actual
// scroll position, so the wrapper's usable scroll range for any section is
// sectionScrollNeeded / 1.7. The ScrollTrigger `end` value must stay within
// that reduced range; the animation target (translateX) stays full-sized
// because GSAP's scrub maps progress 0→1 to x 0→-translateX independently.
// ScrollSmoother speed:1.7 compresses usable scroll range. Empirically:
// progress ≈ 0.5 × SMOOTHER_SPEED (50% at 1.0, 87.5% at 1.7).
// For 100%: 0.5 × 2.0 = 1.0. Any value ≥ 2.0 guarantees all projects reachable.
const SMOOTHER_SPEED = 2.0;

type Project = (typeof PROJECTS)[number];

const Work = () => {
  const currentRef = useRef(0);
  const [current, setCurrent] = useState(0);
  const translateXRef = useRef(0);
  const [selected, setSelected] = useState<Project | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useGSAP(() => {
    function calcTranslateX(): number {
      const boxes = document.getElementsByClassName("work-box");
      if (!boxes.length) return 0;
      const boxWidth = (boxes[0] as HTMLElement).offsetWidth;
      return boxWidth * boxes.length - window.innerWidth;
    }

    translateXRef.current = calcTranslateX();

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        // Divide by SMOOTHER_SPEED: ScrollSmoother speed:1.7 compresses the
        // wrapper's usable scroll range to translateX/1.7. Using the full
        // translateX here would exceed that cap at ~59% progress, stopping
        // at project 5. Dividing keeps the end within what the wrapper allows.
        end: () => {
          translateXRef.current = calcTranslateX();
          return `+=${translateXRef.current / SMOOTHER_SPEED}`;
        },
        scrub: 0.6,
        pin: true,
        id: "work",
        invalidateOnRefresh: true,
        // Snap to each project so half-cards are never visible mid-scroll
        snap: {
          snapTo: 1 / (PROJECTS.length - 1),
          duration: { min: 0.2, max: 0.5 },
          delay: 0.05,
          ease: "power1.inOut",
        },
        onUpdate: (self) => {
          const idx = Math.round(self.progress * (PROJECTS.length - 1));
          if (idx !== currentRef.current) {
            currentRef.current = idx;
            setCurrent(idx);
          }
        },
      },
    });

    timeline.to(".work-flex", {
      x: () => -translateXRef.current,
      ease: "none",
    });

    // ScrollSmoother (initialised in Navbar) measures page height before GSAP
    // injects the pin-spacer and before project images finish loading.
    // We refresh on window "load" (fires after every <img> has decoded) so
    // ScrollSmoother sees the true final page height and unlocks the full
    // horizontal scroll range. A 1 s safety timeout covers the edge-case where
    // "load" already fired before this useGSAP callback ran.
    const onLoad = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") {
      // Page already fully loaded – defer one tick so the pin-spacer exists
      const t = setTimeout(onLoad, 50);
      // Also refresh again after a longer delay to handle any late reflows
      const t2 = setTimeout(onLoad, 1000);
      return () => {
        clearTimeout(t);
        clearTimeout(t2);
        timeline.kill();
        ScrollTrigger.getById("work")?.kill();
      };
    } else {
      window.addEventListener("load", onLoad);
      const t = setTimeout(onLoad, 1000); // safety fallback
      return () => {
        window.removeEventListener("load", onLoad);
        clearTimeout(t);
        timeline.kill();
        ScrollTrigger.getById("work")?.kill();
      };
    }
  }, []);

  // Use smoother.scrollTo() — the site uses GSAP ScrollSmoother so native
  // window.scrollTo fights with it and gets cut short
  const goTo = (idx: number) => {
    const st = ScrollTrigger.getById("work");
    if (!st) return;
    // scroll range = translateX / SMOOTHER_SPEED (wrapper scroll units)
    const scrollRange = translateXRef.current / SMOOTHER_SPEED;
    const target = st.start + (idx / (PROJECTS.length - 1)) * scrollRange;
    if (smoother) {
      smoother.scrollTo(target, true);
    } else {
      window.scrollTo({ top: target, behavior: "smooth" });
    }
  };

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {PROJECTS.map((project, index) => (
            <div
              className="work-box"
              key={index}
              onClick={() => setSelected(project)}
            >
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>
                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>About this project</h4>
                <p>{project.description}</p>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage
                image={project.image}
                alt={project.title}
                link={project.link}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Project detail modal ─────────────────────────────────────────── */}
      {selected && (
        <div
          className="work-modal-backdrop"
          onClick={(e) => e.target === e.currentTarget && setSelected(null)}
        >
          <div className="work-modal">
            <button
              className="work-modal-close"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              <MdClose />
            </button>

            <p className="work-modal-num">
              0{PROJECTS.indexOf(selected) + 1}
            </p>
            <h3 className="work-modal-title">{selected.title}</h3>
            <p className="work-modal-cat">{selected.category}</p>

            <img
              className="work-modal-img"
              src={selected.image}
              alt={selected.title}
            />

            <p className="work-modal-label">About this project</p>
            <p className="work-modal-text">{selected.description}</p>

            <p className="work-modal-label">Tools &amp; features</p>
            <div className="work-modal-tools">
              {selected.tools.split(",").map((t) => (
                <span className="work-modal-tool" key={t}>
                  {t.trim()}
                </span>
              ))}
            </div>

            <a
              className="work-modal-btn"
              href={selected.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiGithub size={16} />
              View on GitHub
            </a>
          </div>
        </div>
      )}

      {/* ── Next arrow ──────────────────────────────────────────────────── */}
      <button
        className={`work-nav work-nav--next${current === PROJECTS.length - 1 ? " work-nav--hidden" : ""}`}
        onClick={() => goTo(currentRef.current + 1)}
        aria-label="Next project"
      >
        <MdArrowForwardIos />
      </button>

      {/* ── Dot indicators ──────────────────────────────────────────────── */}
      <div className="work-dots">
        {PROJECTS.map((_, i) => (
          <button
            key={i}
            className={`work-dot${i === current ? " work-dot--active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Go to project ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Work;
