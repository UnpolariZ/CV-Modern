import translations from '../Helpers/translations';
import MachineEcrire from './MachineEcrire';


function ExperiencePro({language}) {
    return <>
    {/* <div className='anchor'></div> */}
    <div className='anchor'  id='experiencesProfessionnelles'></div>
    <section className='section experiencesProfessionelles'>
    <div>
      <h1 className='title underline'><MachineEcrire text={translations[language].experience}></MachineEcrire></h1>
      <img src='https://www.boulanger.com/etc.clientlibs/boulanger-site/clientlibs/wpk.app/resources/assets/svg/logo-boulanger-full.svg' width={200}></img>
      <div className='experiences__container'>
        <p><strong>{translations[language].annee2020}</strong>{translations[language].boulanger}{translations[language].boulanger10}<a className='link underline' href='https://www.boulanger.com' target='_blank'>boulanger.com</a>.</p>
        <p><strong>{translations[language].annee2021}</strong>{translations[language].boulanger1}<a className='link underline' href='https://www.boulanger.com' target='_blank'>boulanger.com</a>.</p>
        <p><strong>{translations[language].annee2022}</strong>{translations[language].boulanger2}<a className='link underline' href='https://www.fondation-boulanger.fr/' target='_blank'>Boulanger Fondation</a>{translations[language].boulanger3}<a className='link underline' href='https://www.boulanger.com' target='_blank'>boulanger.com</a>{translations[language].boulanger4}</p>
        <p><strong>{translations[language].annee2023}</strong>{translations[language].boulanger5}<a className='link underline' href='https://www.fondation-boulanger.fr/' target='_blank'>Boulanger Fondation</a>{translations[language].boulanger6}<a className='link underline' href='https://www.boulanger.com' target='_blank'>boulanger.com</a>{translations[language].boulanger7}</p>
        <p><strong>{translations[language].annee2024}</strong>{translations[language].boulanger8}<a className='link underline' href='https://www.boulanger.com' target='_blank'>boulanger.com </a>{translations[language].boulanger9}</p>
      </div>
      <img src='https://www.fondation-boulanger.fr/assets/logo.png' width={200} className='logo'></img>
    </div>
  </section>
  </>
  }
export default ExperiencePro;