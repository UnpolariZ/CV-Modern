import translations from '../Helpers/translations';

function LeftNavbar({language}) {
    return <div className='leftNavBar'>
      <a className="link navBarLeftLink souligner" href='#introduction'><span className="link">📍 {translations[language].introduction}</span></a>
      <a className="link navBarLeftLink souligner" href='#experiencesProfessionnelles'><span className="link">📍 {translations[language].experience}</span></a>
      <a className="link navBarLeftLink souligner" href='#formationEtCertification'><span className="link">📍 {translations[language].formationCertification}</span></a>
      <a className="link navBarLeftLink souligner" href='#competenceTechnique'><span className="link">📍 {translations[language].competenceTechnique}</span></a>
    </div>
  }
export default LeftNavbar;