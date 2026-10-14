import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const NAV = [
  { id: "about", label: "ABOUT" },
  { id: "work", label: "WORK" },
  { id: "contact", label: "CONTACT" },
];

const Navbar = () => {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    smoother.paused(true);

    const scrollToSection = (section: string | null) => {
      if (!section || !smoother) return;
      smoother.scrollTo(section, true, "top top");
    };

    const links = document.querySelectorAll(
      ".header ul a, .landing-cta a, .landing-scroll, .contact-cta a"
    );
    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          const target = e.currentTarget as HTMLAnchorElement;
          const section =
            target.getAttribute("data-href") || target.getAttribute("href");
          scrollToSection(section);
        }
      });
    });

    const onScroll = () => {
      const wrapper = document.getElementById("smooth-wrapper");
      const top = wrapper?.scrollTop ?? window.scrollY;
      setScrolled(top > 40);

      const sections = ["about", "work", "contact"];
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.45) current = id;
      }
      setActive(current);
    };

    const wrapper = document.getElementById("smooth-wrapper");
    wrapper?.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => ScrollSmoother.refresh(true));
    const poll = window.setInterval(onScroll, 250);
    onScroll();

    return () => {
      wrapper?.removeEventListener("scroll", onScroll);
      window.clearInterval(poll);
    };
  }, []);

  return (
    <>
      <div className={`header${scrolled ? " header--scrolled" : ""}`}>
        <a href="/#" className="navbar-title" data-cursor="disable">
          Partima
        </a>
        <a
          href="mailto:parigarg211@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          Say hello
        </a>
        <ul>
          {NAV.map((item) => (
            <li key={item.id} className={active === item.id ? "is-active" : ""}>
              <a data-href={`#${item.id}`} href={`#${item.id}`}>
                <HoverLinks text={item.label} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
