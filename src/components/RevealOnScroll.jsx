import { useEffect, useRef } from "react";

export const RevealOnScroll = ({ children, direction = "up" }) => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && ref.current) {
          ref.current.classList.add("visible");
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  });

  return (
    <div ref={ref} className={`reveal reveal--${direction}`}>
      {children}
    </div>
  );
};
