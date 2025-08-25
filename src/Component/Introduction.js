import translations from '../Helpers/translations';
import gitHub from '../Assets/logos/gitHub.svg';
import calendar from '../Assets/logos/calendar.svg';
import linkedIn from '../Assets/logos/linkedIn.svg';
import email from '../Assets/logos/email.svg';
import pp from '../Assets/logos/pp.webp';
import MachineEcrire from './MachineEcrire';

function Introduction({ language }) {
  return (
    <section className="introduction section">
      <div className="whoiam__container">
        <div className="photoDeProfil__container">
          <img
            src={pp}
            className="photoDeProfil"
            alt="photo de profil"
          />
        </div>
        <div>
          <h1>
            <MachineEcrire text="Philippe ADISSON" />
          </h1>
          <h2>Développeur Web & Mobile</h2>
        </div>
      </div>

      <div className="social__container">
        <a
          className="social__btn border link"
          href="mailto:philippe.adisson.pro@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="social__text">
            <img className="social__img logo" src={calendar} alt="calendar" />
            <span>RDV</span>
          </p>
        </a>
        <a
          className="social__btn border link"
          href="https://github.com/unpolariz"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="social__text">
            <img className="social__img logo" src={gitHub} alt="GitHub" />
            <span>GitHub</span>
          </p>
        </a>
        <a
          className="social__btn border link"
          href="https://fr.linkedin.com/in/philippe-adisson-20991a201"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="social__text">
            <img className="social__img logo" src={linkedIn} alt="LinkedIn" />
            <span>LinkedIn</span>
          </p>
        </a>
        <a
          className="social__btn border link"
          href="mailto:philippe.adisson.pro@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="social__text">
            <img className="social__img logo" src={email} alt="Email" />
            <span>Email</span>
          </p>
        </a>
      </div>

      <div className="intro__container">
        <p className="intro">{translations[language].intro}</p>
      </div>
    </section>
  );
}

export default Introduction;
