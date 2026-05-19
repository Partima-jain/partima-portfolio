import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import "./styles/Skills.css";

// ─── Data (sorted by category so grid groups naturally) ───────────────────────
const skills = [
  { name: "Python",        cat: "lang"   },
  { name: "FastAPI",       cat: "lang"   },
  { name: "Django",        cat: "lang"   },
  { name: "Flask",         cat: "lang"   },
  { name: "REST APIs",     cat: "lang"   },
  { name: "Docker",        cat: "devops" },
  { name: "AWS",           cat: "devops" },
  { name: "CI/CD",         cat: "devops" },
  { name: "Git",           cat: "devops" },
  { name: "n8n",           cat: "devops" },
  { name: "PostgreSQL",    cat: "data"   },
  { name: "MongoDB",       cat: "data"   },
  { name: "Pandas",        cat: "data"   },
  { name: "Power BI",      cat: "data"   },
  { name: "NLP",           cat: "ai"     },
  { name: "LangChain",     cat: "ai"     },
  { name: "HuggingFace",   cat: "ai"     },
  { name: "Transformers",  cat: "ai"     },
  { name: "spaCy",         cat: "ai"     },
  { name: "Pinecone",      cat: "ai"     },
  { name: "OpenAI GPT-4",  cat: "ai"     },
  { name: "Gemini",        cat: "ai"     },
  { name: "RAG Pipelines", cat: "ai"     },
  { name: "Generative AI", cat: "ai"     },
  { name: "Fine-tuning",   cat: "ai"     },
  { name: "LLM Agents",    cat: "ai"     },
  { name: "Prompt Eng.",   cat: "ai"     },
  { name: "Chatbot Dev",   cat: "voice"  },
  { name: "Voice Bot",     cat: "voice"  },
  { name: "Whisper STT",   cat: "voice"  },
  { name: "TTS Systems",   cat: "voice"  },
  { name: "Tool Calling",  cat: "voice"  },
  { name: "Agentic AI",    cat: "voice"  },
];

// ─── Category palette ─────────────────────────────────────────────────────────
const CAT: Record<string, { hi: string; mid: string; deep: string; glow: string; label: string }> = {
  lang:   { hi: "#c084fc", mid: "#7c3aed", deep: "#1e0a3e", glow: "#a855f7", label: "Backend / Frameworks" },
  devops: { hi: "#7dd3fc", mid: "#0ea5e9", deep: "#071e30", glow: "#38bdf8", label: "DevOps / Cloud"       },
  data:   { hi: "#6ee7b7", mid: "#10b981", deep: "#022c22", glow: "#34d399", label: "Data / Databases"     },
  ai:     { hi: "#f9a8d4", mid: "#ec4899", deep: "#3b0020", glow: "#f472b6", label: "AI / LLMs"            },
  voice:  { hi: "#fde68a", mid: "#f59e0b", deep: "#3b1a00", glow: "#fbbf24", label: "Conversational AI"    },
};

// ─── Build canvas texture with the skill name baked in ────────────────────────
function makeTexture(cat: string, name: string): THREE.CanvasTexture {
  const S = 512;
  const cv = document.createElement("canvas");
  cv.width = S; cv.height = S;
  const ctx = cv.getContext("2d")!;
  const p = CAT[cat] ?? CAT.ai;

  // clip to sphere disc
  ctx.save();
  ctx.beginPath();
  ctx.arc(S / 2, S / 2, S / 2, 0, Math.PI * 2);
  ctx.clip();

  // ── base gradient ──────────────────────────────────────────────────────────
  const base = ctx.createRadialGradient(S * .38, S * .33, S * .01, S / 2, S / 2, S / 2);
  base.addColorStop(0,   p.hi);
  base.addColorStop(0.5, p.mid);
  base.addColorStop(1,   p.deep);
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, S, S);

  // ── iridescent shimmer ─────────────────────────────────────────────────────
  const sh = ctx.createRadialGradient(S * .7, S * .72, 0, S * .65, S * .7, S * .42);
  sh.addColorStop(0, p.glow + "44");
  sh.addColorStop(1, "transparent");
  ctx.fillStyle = sh;
  ctx.fillRect(0, 0, S, S);

  // ── primary specular highlight ─────────────────────────────────────────────
  const hi = ctx.createRadialGradient(S * .30, S * .24, 0, S * .34, S * .28, S * .30);
  hi.addColorStop(0,   "rgba(255,255,255,0.92)");
  hi.addColorStop(.35, "rgba(255,255,255,0.28)");
  hi.addColorStop(1,   "rgba(255,255,255,0)");
  ctx.fillStyle = hi;
  ctx.fillRect(0, 0, S, S);

  // ── sharp sparkle ──────────────────────────────────────────────────────────
  const sp = ctx.createRadialGradient(S * .25, S * .19, 0, S * .25, S * .19, S * .07);
  sp.addColorStop(0, "rgba(255,255,255,1)");
  sp.addColorStop(1, "transparent");
  ctx.fillStyle = sp;
  ctx.fillRect(0, 0, S, S);

  // ── rim glow ───────────────────────────────────────────────────────────────
  const rim = ctx.createRadialGradient(S / 2, S * .93, 0, S / 2, S * .85, S * .48);
  rim.addColorStop(0, p.glow + "66");
  rim.addColorStop(1, "transparent");
  ctx.fillStyle = rim;
  ctx.fillRect(0, 0, S, S);

  // ── skill name baked into the front face (UV center at x=S*0.25, y=S*0.5) ─
  // In Three.js SphereGeometry, the front-facing point (+Z toward camera)
  // lies at U=0.25 → canvas X = S * 0.25 = 128
  const cx = S * 0.25;
  const cy = S * 0.5;
  const maxW = 148; // max canvas-pixels wide before we shrink / wrap

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor  = "rgba(255,255,255,0.15)";
  ctx.shadowBlur   = 3;
  ctx.fillStyle    = "#000000";

  // split into at most 2 lines at the first space
  const parts = name.split(" ");
  const lines = parts.length > 1 ? [parts.slice(0, 1).join(" "), parts.slice(1).join(" ")] : [name];

  // auto-size: shrink until the longest line fits within maxW
  let fs = 66;
  ctx.font = `800 ${fs}px "Arial", sans-serif`;
  const longest = lines.reduce((a, b) => (b.length > a.length ? b : a), "");
  while (ctx.measureText(longest).width > maxW && fs > 28) {
    fs -= 3;
    ctx.font = `800 ${fs}px "Arial", sans-serif`;
  }

  if (lines.length === 1) {
    ctx.fillText(lines[0], cx, cy);
  } else {
    const gap = fs * 1.15;
    ctx.fillText(lines[0], cx, cy - gap / 2);
    ctx.fillText(lines[1], cx, cy + gap / 2);
  }

  ctx.restore();
  return new THREE.CanvasTexture(cv);
}

// ─── Grid layout ──────────────────────────────────────────────────────────────
const COLS = 8, CSPACING = 4.6, RSPACING = 4.2;

function gridPositions(n: number): THREE.Vector3[] {
  return Array.from({ length: n }, (_, i) => {
    const row = Math.floor(i / COLS);
    const col = i % COLS;
    const inRow = Math.min(COLS, n - row * COLS);
    const rowOff = ((COLS - inRow) * CSPACING) / 2;
    const rows = Math.ceil(n / COLS);
    const x = col * CSPACING - ((COLS - 1) * CSPACING) / 2 + rowOff;
    const y = ((rows - 1) * RSPACING) / 2 - row * RSPACING;
    return new THREE.Vector3(x, y, 0);
  });
}

const TARGETS = gridPositions(skills.length);
const GEO = new THREE.SphereGeometry(1, 64, 64);

// ─── Single orb ───────────────────────────────────────────────────────────────
function Orb({
  skill, target, tex, idx,
}: {
  skill: { name: string; cat: string };
  target: THREE.Vector3;
  tex: THREE.CanvasTexture;
  idx: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const mat = useMemo(() => new THREE.MeshPhysicalMaterial({
    map:                tex,
    emissiveMap:        tex,
    emissive:           new THREE.Color(CAT[skill.cat]?.glow ?? "#aaa"),
    emissiveIntensity:  0.12,
    roughness:          0.08,
    metalness:          0.0,
    clearcoat:          1.0,
    clearcoatRoughness: 0.03,
  }), [tex, skill.cat]);

  const floatPhase  = useRef(idx * 1.37 % (Math.PI * 2));
  const floatSpd    = useRef(0.38 + (idx * 0.031 % 0.28));
  const floatAmp    = useRef(0.09 + (idx * 0.017 % 0.07));
  const BASE        = 1.68;

  const curPos      = useRef(new THREE.Vector3(target.x, target.y, 0));
  const curScale    = useRef(0);
  const curEmissive = useRef(0.12);
  const pulseT      = useRef(0);
  const DELAY       = idx * 0.028;

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const clock = state.clock.elapsedTime;

    // spring entrance
    const raw    = Math.max(0, clock - DELAY);
    const t      = Math.min(1, raw * 1.9);
    const spring = t < 0.65
      ? (t / 0.65) * (t / 0.65)
      : 1 + Math.sin((t - 0.65) / 0.35 * Math.PI) * 0.05 * (1 - t);

    const floatY = t >= 1
      ? Math.sin(clock * floatSpd.current + floatPhase.current) * floatAmp.current
      : 0;

    const tgtS = hovered ? BASE * 1.38 : BASE;
    const tgtE = hovered ? 0.72 : 0.12;

    curScale.current    += (tgtS * spring - curScale.current) * 0.13;
    curEmissive.current += (tgtE - curEmissive.current) * 0.09;

    if (hovered) {
      pulseT.current += delta * 4;
      mat.emissiveIntensity = curEmissive.current + Math.sin(pulseT.current) * 0.18;
    } else {
      mat.emissiveIntensity = curEmissive.current;
    }

    meshRef.current.scale.setScalar(curScale.current);
    curPos.current.set(target.x, target.y + floatY, hovered ? 2.5 : 0);
    meshRef.current.position.lerp(curPos.current, 0.1);

    // Keep the text-bearing face (local +Z = U=0.25) always pointing at the camera
    meshRef.current.lookAt(state.camera.position);

    document.body.style.cursor = hovered ? "pointer" : "";
  });

  useEffect(() => () => { document.body.style.cursor = ""; }, []);

  return (
    <mesh
      ref={meshRef}
      geometry={GEO}
      material={mat}
      position={[target.x, target.y, 0]}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      castShadow
    />
  );
}

// ─── Lights ───────────────────────────────────────────────────────────────────
function Lights() {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[8, 16, 12]} intensity={3.2} castShadow />
      <pointLight position={[-12, 10, 8]}  intensity={2.5} color="#c084fc" />
      <pointLight position={[12, -8, 8]}   intensity={2.0} color="#38bdf8" />
      <pointLight position={[0, -14, 5]}   intensity={1.5} color="#f472b6" />
      <pointLight position={[0,  16, 5]}   intensity={1.0} color="#fde68a" />
    </>
  );
}

// ─── Scene ────────────────────────────────────────────────────────────────────
function Scene({ textures }: { textures: THREE.CanvasTexture[] }) {
  return (
    <>
      <Lights />
      <Environment preset="city" />
      {skills.map((s, i) => (
        <Orb key={i} skill={s} target={TARGETS[i]} tex={textures[i]} idx={i} />
      ))}
    </>
  );
}

// ─── Legend dot ───────────────────────────────────────────────────────────────
function LegendDot({ cat }: { cat: string }) {
  const p = CAT[cat];
  return (
    <span className="skills-legend-item">
      <span
        className="skills-legend-dot"
        style={{ background: `radial-gradient(circle at 35% 35%, ${p.hi}, ${p.mid})` }}
      />
      {p.label}
    </span>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
const Skills = () => {
  // `mounted` latches true on first intersection and never resets — this
  // prevents the canvas from tearing down and remounting every time the user
  // scrolls back into the section.
  const [mounted, setMounted] = useState(false);
  // `visible` tracks whether the section is currently in the viewport. It
  // drives `frameloop` so the WebGL render loop pauses when off-screen.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = document.getElementById("skills");
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setMounted(true); // latch — never goes back to false
          setVisible(true);
        } else {
          setVisible(false); // pause render loop when scrolled away
        }
      },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const textures = useMemo(
    () => skills.map(({ cat, name }) => makeTexture(cat, name)),
    []
  );

  return (
    <section className="skills-section" id="skills">
      <div className="skills-header">
        <h2 className="skills-title">
          My <span>Skills</span>
        </h2>
        <p className="skills-sub">Hover any orb · each colour is a category</p>
        <div className="skills-legend">
          {Object.keys(CAT).map((cat) => (
            <LegendDot key={cat} cat={cat} />
          ))}
        </div>
      </div>

      <div className="skills-canvas-wrap">
        {mounted && (
          <Canvas
            shadows
            // "always" while visible → full 60fps render loop
            // "demand" while off-screen → render loop pauses, no GPU work
            frameloop={visible ? "always" : "demand"}
            gl={{
              alpha: true,
              antialias: true,
              toneMapping: THREE.ACESFilmicToneMapping,
            }}
            camera={{ position: [0, 0, 30], fov: 56, near: 0.5, far: 120 }}
            onCreated={(s) => (s.gl.toneMappingExposure = 1.45)}
          >
            <Scene textures={textures} />
          </Canvas>
        )}
      </div>
    </section>
  );
};

export default Skills;
