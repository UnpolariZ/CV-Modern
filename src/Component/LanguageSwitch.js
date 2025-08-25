
// Composant LanguageSwitch
const LanguageSwitch = ({ language, setLanguage }) => {

  // Fonction pour basculer entre les langues
  const toggleLanguage = () => {
    const newLanguage = language === 'fr' ? 'en' : 'fr';
    setLanguage(newLanguage);  // Met à jour la langue
  };

  return (
    <div className="language-switch-container">
      <button
        className={`language-button ${language === 'fr' ? 'active' : ''}`}
        onClick={() => toggleLanguage('fr')}
      >
        Fr
      </button>
      <button
        className={`language-button ${language === 'en' ? 'active' : ''}`}
        onClick={() => toggleLanguage('en')}
      >
        En
      </button>
    </div>
  );
};

export default LanguageSwitch;
