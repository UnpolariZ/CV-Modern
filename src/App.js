import { Canvas } from "@react-three/fiber";
import { Experience } from "./Component/Experience.js";
import ParticleScene from '../src/Component/ParticleThree.js';
import CometScene from '../src/Component/Comet.js';
import logo from './Assets/logos/logo_cv.png';
import LeftNavbar from './Component/LeftNavBar';
import Introduction from './Component/Introduction';
import ExperiencePro from './Component/ExperiencePro';
import Formation from './Component/Formation';
import Competence from './Component/Competence';
import Navbar from './Component/NavBar';
import LanguageSwitch from './Component/LanguageSwitch';
import ScrollToQuarterPage from './Component/Scroll';
import translations from './Helpers/translations';
import React, { useState, useEffect } from 'react';
import AnimatedCursor from "react-animated-cursor"
import DarkModeToggle from './Component/DarkMode';
import About from './Component/About';
import MachineEcrire from "./Component/MachineEcrire.js";

import './App.css';
import './CSS/navbar.css';
import './CSS/translations.css';
import './CSS/chatbox.css';
import './CSS/darklightmode.css';

function App() {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage ? savedLanguage : 'fr';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const [isDarkMode, setIsDarkMode] = useState(null);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setIsDarkMode(JSON.parse(savedMode));
    } else {
      setIsDarkMode(false);
    }
  }, []);

  let cursorColor = isDarkMode ? '200, 200, 200' : '0, 0, 0';

  useEffect(() => {
    const navbarTextElements = document.querySelectorAll(".souligner");
    const navbarLogoElements = document.querySelectorAll(".logo");
    const link = document.querySelectorAll(".link");
    const border = document.querySelectorAll(".border");
    const section = document.querySelectorAll(".section");
    const navBarLeftLink = document.querySelectorAll(".navBarLeftLink");
    if (isDarkMode !== null) {
      if (isDarkMode) {
        document.body.classList.add('dark');
        document.querySelector(".App-logo").classList.add('dark');
        document.querySelector(".leftNavBar").classList.add('dark');
        navBarLeftLink.forEach(e => e.classList.add('dark'));
        document.querySelector(".gradients-container").classList.add('dark');
        document.querySelector(".navbar__container").classList.add('dark');
        link.forEach(e => e.classList.add('dark'));
        border.forEach(e => e.classList.add('dark'));
        navbarTextElements.forEach(e => e.classList.add("dark"));
        navbarLogoElements.forEach(e => e.classList.add("dark"));
        section.forEach(e => e.classList.add('dark'));
        localStorage.setItem('darkMode', JSON.stringify(true));
      } else {
        document.body.classList.remove('dark');
        document.querySelector(".leftNavBar").classList.remove('dark');
        section.forEach(e => e.classList.remove('dark'));
        navBarLeftLink.forEach(e => e.classList.remove('dark'));
        document.querySelector(".gradients-container").classList.remove('dark');
        document.querySelector(".App-logo").classList.remove('dark');
        document.querySelector(".navbar__container").classList.remove('dark');
        link.forEach(e => e.classList.remove('dark'));
        border.forEach(e => e.classList.remove('dark'));
        navbarTextElements.forEach(e => e.classList.remove("dark"));
        navbarLogoElements.forEach(e => e.classList.remove("dark"));
        localStorage.setItem('darkMode', JSON.stringify(false));
      }
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  document.addEventListener('DOMContentLoaded', () => {
    const interBubble = document.querySelector(".interactive");
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    function move() {
      curX += (tgX - curX) / 20;
      curY += (tgY - curY) / 20;
      interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
      requestAnimationFrame(() => {
        move();
      });
    }

    window.addEventListener('mousemove', event => {
      tgX = event.clientX;
      tgY = event.clientY;
    });

    move();
  });

  /// États de navigation ///
  const [showCV, setShowCV] = useState(true);
  const [showAbout, setShowAbout] = useState(false);

  const handleWorkClick = () => {
    setShowCV(false);
    setShowAbout(false);
  };

  const handleHomeClick = () => {
    setShowCV(true);
    setShowAbout(false);
  };

  const handleAboutClick = () => {
    setShowCV(false);
    setShowAbout(true);
  };

  return (
    <div className="App">
      <div id='introduction' className='top'></div>
      <header className="App-header">
        <ScrollToQuarterPage />
        <img src={logo} className="App-logo logo" alt="logo" />
        <Navbar
          language={language}
          onWorkClick={handleWorkClick}
          onHomeClick={handleHomeClick}
          onAboutClick={handleAboutClick}
        />
        <div className='switch__container'>
          <LanguageSwitch language={language} setLanguage={setLanguage} />
          <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        </div>
      </header>

      <AnimatedCursor
        color={cursorColor}
        innerSize={8}
        outerSize={35}
        innerScale={1}
        outerScale={1.7}
        clickables={[
          'a', 'input[type="text"]', 'input[type="email"]', 'input[type="number"]',
          'input[type="submit"]', 'input[type="image"]', 'label[for]', 'select',
          'textarea', 'button', '.link'
        ]}
      />

      <div className="homePage-firstContainer"></div>
      <ParticleScene />
      <CometScene />

      <div className="gradient-bg">
        <svg xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
        <div className="gradients-container">
          <div className="g1"></div>
          <div className="g2"></div>
          <div className="g3"></div>
          <div className="g4"></div>
          <div className="g5"></div>
          <div className="interactive"></div>
        </div>
      </div>

      {/* CV */}
      <div className={`cv-dev__container ${showCV ? 'visible' : 'hidden'}`}>
        <Introduction language={language} />
        <About language={language} />       
      </div>

      {/* About */}
      <div className={`about__container ${showAbout ? 'visible' : 'hidden'}`}>
        <LeftNavbar language={language} />
        <div className='header__placeholder'></div>
        <Introduction language={language} />
        <div className="space"></div>
        <ExperiencePro language={language} />
        <div className="space"></div>
        <Formation language={language} />
        <div className="space"></div>
        <Competence language={language} />
        <div className="space"></div>
      </div>

      {/* Projets */}
      <div id="projet1" className={`video__container ${showCV || showAbout ? 'hidden' : 'visible'}`} style={{ zIndex: 2 }}>
                <div className='header__placeholder'></div>

        <div className="video__space">
          <h2 style={{ justifySelf: "center" }}><MachineEcrire text="CV 2.0" /></h2>
          <span>HTML - CSS - JS - REACT - THREEJS - GSAP</span>
        </div>
        <video controls autoPlay width="750">
          <source src="video.mp4" type="video/mp4" />
        </video>

        <span id="projet2" style={{ marginTop: 250 }}></span>
        <div className="video__space">
          <h2><MachineEcrire text="Modelisation3D.com" /></h2>
          <span>HTML - CSS - JS - THREEJS - GSAP</span>
        </div>
        <video controls autoPlay width="750">
          <source src="video2.mp4" type="video/mp4" />
        </video>

        <span id="projet3" style={{ marginTop: 250 }}></span>
        <div className="video__space">
          <h2><MachineEcrire text="Boulanger Fondation" /></h2>
          <span>HTML - SCSS - JS - JQUERY</span>
        </div>
        <video controls autoPlay width="750">
          <source src="video3.mp4" type="video/mp4" />
        </video>

        <span id="projet4" style={{ marginTop: 250 }}></span>
        <div className="video__space">
          <h2><MachineEcrire text="Outil de Signature - GMAIL" /></h2>
          <span>HTML - CSS - JS</span>
        </div>
        <video controls autoPlay width="750">
          <source src="video4.mp4" type="video/mp4" />
        </video>

        <span style={{ marginBottom: 225 }}></span>
      </div>
    </div>
  );
}

export default App;
