// AnimatedParagraph.js
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const AnimatedParagraph = ({ text }) => {
  const paragraphRef = useRef(null);

  useEffect(() => {
    const paragraph = paragraphRef.current;
    const letters = paragraph.querySelectorAll('span');
    
    gsap.fromTo(
      letters, 
      {
        opacity: 0, 
        x: (i) => (Math.random() > 0.5 ? -100 : 100) // Position aléatoire à gauche ou droite
      },
      {
        opacity: 1,
        x: 0,
        stagger: 0.1, // délai entre chaque lettre
        ease: 'power4.out', // Animation fluide
        duration: 1
      }
    );
  }, []);

  return (
    <p ref={paragraphRef}>
      {text.split('').map((char, index) => (
        <span key={index}>{char}</span>
      ))}
    </p>
  );
};

export default AnimatedParagraph;
