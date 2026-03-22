import { useRef, useState, useEffect, type ReactNode, type CSSProperties } from "react";

interface RevealDivProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
}

export function RevealDiv({ children, className = "", style = {}, delay = 0 }: RevealDivProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 0.5s ${delay}s ease, transform 0.5s ${delay}s ease`,
      }}
    >
      {children}
    </div>
  );
}
