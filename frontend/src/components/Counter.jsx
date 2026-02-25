import { useEffect, useRef, useState } from "react";

export default function Counter({
  end = 100,
  duration = 2000,
  suffix = "",
  decimals = 0,
  className = ""
}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    let startTime = null;

    const animate = (time) => {
      if (!startTime) startTime = time;

      const progress = time - startTime;
      const value = Math.min((progress / duration) * end, end);

      setCount(value);

      if (progress < duration) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [started, end, duration]);

  const formatted =
    decimals > 0 ? count.toFixed(decimals) : Math.floor(count);

  return (
    <span ref={ref} className={className}>
      {formatted}
      {suffix}
    </span>
  );
}