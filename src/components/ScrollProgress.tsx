import { useEffect, useState } from "react";
import "./styles/ScrollProgress.css";

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const wrapper = document.getElementById("smooth-wrapper");
      const content = document.getElementById("smooth-content");
      if (!wrapper || !content) return;
      const max = content.scrollHeight - wrapper.clientHeight;
      const top = wrapper.scrollTop;
      setProgress(max > 0 ? Math.min(1, Math.max(0, top / max)) : 0);
    };

    const wrapper = document.getElementById("smooth-wrapper");
    wrapper?.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const id = window.setInterval(update, 200);
    update();

    return () => {
      wrapper?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.clearInterval(id);
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden>
      <div
        className="scroll-progress__bar"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
};

export default ScrollProgress;
