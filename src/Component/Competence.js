import translations from '../Helpers/translations';
import react from '../Assets/images/react.webp';
import threejs from '../Assets/images/threejs.png';
import blender from '../Assets/images/blender.png';
import figma from '../Assets/images/figma.png';
import adobexd from '../Assets/images/adobexd.png';
import illustrator from '../Assets/images/illustrator.png';
import photoshop from '../Assets/images/photoshop.png';
import aem from '../Assets/images/aem.png';
import htmlcssjs from '../Assets/images/htmlcssjs.png';
import scss from '../Assets/images/scss.png';
import gsap from '../Assets/images/gsap.jpg';
import jquery from '../Assets/images/jquery.png';
import MachineEcrire from './MachineEcrire';

function Competence({language}) {
    return  <section className='competenceTechnique section' style={{zIndex:1}} >
      <div id='competenceTechnique' class="carousel__face carre"></div>
{/* <div class="carousel__container">
  <div class="carousel">
    <div class="carousel__face carre"><span></span></div>
    <div class="carousel__face carre"><span></span></div>
    <div class="carousel__face "><span></span></div>
    <div class="carousel__face carre"><span></span></div>
    <div class="carousel__face carre"><span></span></div>
    <div class="carousel__face carre"><span></span></div>
    <div class="carousel__face carre"><span></span></div>
    <div class="carousel__face carre"><span></span></div>
    <div class="carousel__face carre"><span></span></div>
    <div class="carousel__face carre"><span></span></div>
    <div class="carousel__face carre"><span></span></div>
    <div class="carousel__face carre"><span></span></div>
  </div>
  
</div> */}
      <section>
            <h1 className='title underline'><MachineEcrire text={translations[language].competenceTechnique} />
            </h1>

        <ul className='competenceTechnique__col'>
          <li><strong>Langages :</strong> HTML, CSS, JavaScript, TypeScript, SQL, Python</li>
          <li><strong>Frameworks & Librairies :</strong> React.js, Next.js, Node.js, Three.js, GSAP, jQuery</li>
          <li><strong>Outils de Développement :</strong> VS Code, IntelliJ, Postman, Mockoon</li>
          <li><strong>Testing :</strong> Cypress, Playwright, Appium, RobotFramework, Selenium</li>
          <li><strong>CI/CD & Conteneurisation :</strong> Docker, Rancher</li>
          <li><strong>Versioning & Collaboration :</strong> Git, GitHub, GitLab</li>
          <li><strong>Outils de Gestion de Projet :</strong> Jira, Squash, Mantis, TestLink</li>
          <li><strong>Design & Prototypage :</strong> Figma, Adobe XD</li>
          <li><strong>Environnement :</strong> Linux, Windows, macOS</li>
          <li><strong>Gestionnaire de Paquets :</strong> npm, yarn</li>
        </ul>
      </section>

{/* 
<div class="carousel__container">
  <div class="carousel">
    <div class="carousel__face carre"><span>HTML</span></div>
    <div class="carousel__face carre"><span>React</span></div>
    <div class="carousel__face "><span> / CSS / JS / SCSS</span></div>
    <div class="carousel__face carre"><span>GSAP</span></div>
    <div class="carousel__face carre"><span>ThreeJS</span></div>
    <div class="carousel__face carre"><span>FIGMA</span></div>
    <div class="carousel__face carre"><span>AEM</span></div>
    <div class="carousel__face carre"><span>JQUERY</span></div>
    <div class="carousel__face carre"><span>Blender</span></div>
    <div class="carousel__face carre"><span>adobeXD</span></div>
    <div class="carousel__face carre"><span>Illustrator</span></div>
    <div class="carousel__face carre"><span>Photoshop</span></div>
  </div>
</div> */}


{/*         
            <div className='competence__container'>
                <img src={htmlcssjs} width={250} height={250}></img>
            </div>

            <div className='competence__container'>
                <img src={scss} width={250} height={150}></img>
                <img src={jquery} width={175} height={150}></img>
            </div>    
            <div className='competence__container'>
                <img className='competence__img' src={react} width={250} height={150}></img>
                <img className='competence__img' src={aem} width={250} height={150}></img>
            </div>
            <div className='competence__container'>
                <img className='competence__img' src={threejs} width={250} height={150}></img>
                <img className='competence__img' src={gsap} width={250} height={150}></img>
            </div>
    <div>
        <h1>Esprit Créatif</h1>
        <div className='competence__container'>
                <img src={blender} width={250} height={75}></img>
                <img className='logo' src={figma} width={250} height={150}></img>
        </div>
        <div className='competence__container'>
        <img className='competence__img' src={adobexd} width={100} height={100}></img>
        <img className='competence__img' src={illustrator} width={100} height={100}></img>        
        <img className='competence__img' src={photoshop} width={100} height={100}></img>
        
        </div>
    </div> */}
  </section>   
  }
export default Competence;