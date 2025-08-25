import translations from '../Helpers/translations';
//HOME -> TO DO CHANGE ABOUT TO HOME
function About({ language }) {
  return (
    <div className='about__container'>
      {/* <h1>{translations[language].about}</h1> */}
      <p style={{ maxWidth: '800px', margin: 'auto'}}>
        {/* Je suis développeur passionné par le développement web et la 3D.
        Voici une section à propos où vous pouvez détailler votre parcours, vos passions, vos compétences ou votre vision du métier. */}
      </p>
    </div>
  );
}

export default About;
