import Header from "./Header";
import Banner from "./Banner";
import Experience from "./Experience";
import AboutSkills from "./AboutSkills";
import Projects from "./Projects";
import ContactFooter from "./ContactFooter";

const MainContainer = () => {
  return (
    <div className="site">
      <Header />
      <Banner />
      <Experience />
      <AboutSkills />
      <Projects />
      <ContactFooter />
    </div>
  );
};

export default MainContainer;
