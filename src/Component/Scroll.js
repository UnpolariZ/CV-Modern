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

  const getCurrentGroup = () => {
    const hash = window.location.hash.replace('#', '');
    // Cherche le groupe auquel appartient le hash actuel
    const groupEntry = Object.entries(sectionGroups).find(([_, ids]) =>
      ids.includes(hash)
    );

    if (groupEntry) {
      return groupEntry;
    }

    // Si le hash correspond à un groupe principal (par exemple #work)
    if (sectionGroups[hash]) {
      return [hash, sectionGroups[hash]];
    }

    // Par défaut, retourne 'introduction'
    return ['introduction', sectionGroups.introduction];
  };

  const handleScroll = (event) => {
    if (isScrolling.current) {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    isScrolling.current = true;

    const hash = window.location.hash.replace('#', '');
    const [currentGroupKey, currentGroup] = getCurrentGroup();

    const currentIndex = currentGroup.indexOf(hash);

    let nextIndex;

    if (event.deltaY > 0) {
      // Scroll vers le bas
      nextIndex = currentIndex === -1 ? 0 : Math.min(currentIndex + 1, currentGroup.length - 1);
    } else {
      // Scroll vers le haut
      nextIndex = currentIndex === -1 ? 0 : Math.max(currentIndex - 1, 0);
    }

    const nextSectionId = currentGroup[nextIndex];
    const nextElement = document.getElementById(nextSectionId);

    if (nextElement) {
      nextElement.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState(null, '', `#${nextSectionId}`);
    }

    setTimeout(() => {
      isScrolling.current = false;
    }, 500);
  };

  useEffect(() => {
    window.addEventListener('wheel', handleScroll, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  return null;
};

export default ScrollToQuarterPage;

