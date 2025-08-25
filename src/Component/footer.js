import translations from '../Helpers/translations';
import home from '../Assets/logos/home.svg';
import about from '../Assets/logos/about.svg';
import work from '../Assets/logos/work.svg';

function Footer({language}) {
    return <div className='footer'>
      <div className='footer__container'>
        <div className='footer__button'><p className='footer__text souligner'><img className='footer__logo logo' src={home} />{translations[language].home}</p></div>
        <div className='footer__button'><p className='footer__text souligner'><img className='footer__logo logo' src={about} />{translations[language].about}</p></div>
        <div className='footer__button'><p className='footer__text souligner'><img className='footer__logo logo' src={work} />{translations[language].work}</p></div>
      </div>
    </div>
  }
export default Footer;