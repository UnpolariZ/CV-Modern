import translations from '../Helpers/translations';
import opquast from '../Assets/logos/opquast.svg';
import MachineEcrire from './MachineEcrire';

function Formation({language}) {
    return <>
        <div className='anchor'></div>
        <div className='anchor2' id='formationEtCertification'></div>
        <section className='formationEtCertification section'>
    <h1 className='title underline'><MachineEcrire text={translations[language].formationCertification}></MachineEcrire></h1>
    <div className='formation__container'>
      {/* <h3 style={{marginTop:50}}>Certification ISTQB</h3> */}
      <img style={{marginTop:25}} src="./istqb.png" className="istqb logo" alt="logo"/>
    <div className='texte-formation__container'>
      <p className='formation-text'>{translations[language].istqb}<a href='' className='link underline' target="_blank">ISTQB</a></p>     
    </div>
      {/* <h3 style={{marginTop:35}}>{translations[language].opquastCertification}</h3> */}
    <img style={{marginTop:35}} src={opquast} className="opquast logo" alt="logo" />
    <div className='texte-formation__container'>
      <p className='formation-text'>{translations[language].opquastTextCertification}<a href='https://www.opquast.com/' className='link underline' target="_blank">Opquast</a></p>
    </div>
        {/* <h3 style={{marginTop:35}}>{translations[language].programmeZ}</h3> */}
      <img style={{marginTop:35}} src="https://www.z-association.fr/wp-content/uploads/2024/02/logo_Z-code-pour-emploi.svg" className="programmeZ logo" alt="logo" />
      <div className='programmeZ__container  texte-formation__container'> 
       <div className='formation-text'>
        <p>{translations[language].programmeZText}</p>
        <p>{translations[language].programmeZText2}</p>
        </div>   
      </div>
    </div>

  </section>   
  </>
  }
export default Formation;