import React, { useEffect, useRef } from 'react';

const ScrollToQuarterPage = () => {
  const sectionGroups = {
    introduction: [
      'introduction',
      'experiencesProfessionnelles',
      'formationEtCertification',
      'competenceTechnique',
    ],
    work: ['projet1', 'projet2', 'projet3', 'projet4', 'projet5'],
    about: ['about1', 'about2', 'about3'],
  };

  const isScrolling = useRef(false);
  const scrollDirection = useRef(null);
  const deltaYBuffer = useRef(0);

  const SCROLL_THRESHOLD = 60; 
  const getCurrentGroup = () => {
    const hash = window.location.hash.replace('#', '');
    const groupEntry = Object.entries(sectionGroups).find(([_, ids]) =>
      ids.includes(hash)
    );
    if (groupEntry) return groupEntry;
    if (sectionGroups[hash]) return [hash, sectionGroups[hash]];
    return ['introduction', sectionGroups.introduction];
  };

  const scrollToSection = (direction) => {
    const hash = window.location.hash.replace('#', '');
    const [_, currentGroup] = getCurrentGroup();
    const currentIndex = currentGroup.indexOf(hash);
    let nextIndex;

    if (direction === 'down') {
      nextIndex = currentIndex === -1 ? 0 : Math.min(currentIndex + 1, currentGroup.length - 1);
    } else {
      nextIndex = currentIndex === -1 ? 0 : Math.max(currentIndex - 1, 0);
    }

    const nextSectionId = currentGroup[nextIndex];
    const nextElement = document.getElementById(nextSectionId);

    if (nextElement) {
      nextElement.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState(null, '', `#${nextSectionId}`);
    }

    isScrolling.current = true;
    deltaYBuffer.current = 0; 
    setTimeout(() => {
      isScrolling.current = false;
    }, 700); 
  };

  const handleWheel = (event) => {
    event.preventDefault();

    if (isScrolling.current) return;

    deltaYBuffer.current += event.deltaY;

    if (deltaYBuffer.current > SCROLL_THRESHOLD) {
      scrollToSection('down');
    } else if (deltaYBuffer.current < -SCROLL_THRESHOLD) {
      scrollToSection('up');
    }
  };

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return null;
};

export default ScrollToQuarterPage;
