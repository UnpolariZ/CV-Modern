import translations from '../Helpers/translations';
import home from '../Assets/logos/home.svg';
import about from '../Assets/logos/about.svg';
import work from '../Assets/logos/work.svg';

function Navbar({ language, onWorkClick, onHomeClick, onAboutClick }) {
  return (
    <div className='navbar'>
      <div className='navbar__container'>
        <a className='navbar__button' href='#about' onClick={onHomeClick}>
          <p className='navbar__text souligner'>
            <img className='navbar__logo logo' src={home} />
            {translations[language].home}
          </p>
        </a>
        <a className='navbar__button' href='#experiencesProfessionnelles' onClick={onAboutClick}>
          <p className='navbar__text souligner'>
            <img className='navbar__logo logo' src={about} />
            {translations[language].about}
          </p>
        </a>
        <a className='navbar__button work' href='#projet1' onClick={onWorkClick}>
          <p className='navbar__text souligner'>
            <img className='navbar__logo logo' src={work} />
            {translations[language].work}
          </p>
        </a>
      </div>
    </div>
  );
}

export default Navbar;
