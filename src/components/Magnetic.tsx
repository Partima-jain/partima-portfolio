import {
  PropsWithChildren,
  useRef,
  MouseEvent as ReactMouseEvent,
} from "react";

type Props = PropsWithChildren<{
  className?: string;
  strength?: number;
  as?: "div" | "a" | "button";
  href?: string;
  onClick?: () => void;
  "data-cursor"?: string;
  type?: "button" | "submit";
  target?: string;
  rel?: string;
}>;

const Magnetic = ({
  children,
  className = "",
  strength = 0.35,
  as = "div",
  href,
  onClick,
  type = "button",
  target,
  rel,
  ...rest
}: Props) => {
  const ref = useRef<HTMLElement | null>(null);

  const onMove = (e: ReactMouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
  };

  const shared = {
    ref: ref as never,
    className: `magnetic ${className}`.trim(),
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    onClick,
    ...rest,
  };

  if (as === "a") {
    return (
      <a href={href} target={target} rel={rel} {...shared}>
        {children}
      </a>
    );
  }

  if (as === "button") {
    return (
      <button type={type} {...shared}>
        {children}
      </button>
    );
  }

  return <div {...shared}>{children}</div>;
};

export default Magnetic;
