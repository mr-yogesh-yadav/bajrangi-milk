
import { useEffect, useRef } from "react";
import "./Reveal.css";

function Reveal({ children, delay = 0 }) {
  const revealRef = useRef(null);

  useEffect(() => {
    const element = revealRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("show");
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={revealRef}
      className="reveal"
      style={{ "--delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default Reveal;
