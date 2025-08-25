import { useEffect, useRef, useState } from "react";

export default function MachineEcrire({ text = "" }) {
  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const machineRef = useRef(null);

  // 🔍 Observer la visibilité
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const current = machineRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  // 🔄 Reset lorsque le texte change
  useEffect(() => {
    setDisplayedText("");
    setCharIndex(0);
    setIsDone(false);
  }, [text]);

  // 🏗️ Effet principal : machine à écrire
  useEffect(() => {
    if (isVisible) {
      if (charIndex < text.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(text.substring(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        setIsDone(true);
      }
    } else {
      setDisplayedText("");
      setCharIndex(0);
      setIsDone(false);
    }
  }, [charIndex, isVisible, text]);

  return (
    <div className="machineEcrire" ref={machineRef}>
      {displayedText}
      <span className={`cursor ${isDone ? "blink" : ""}`}>|</span>
    </div>
  );
}
