import AboutSection from "./sections/AboutSection";
import ConnectSection from "./sections/ConnectSection";
import IntroductionSection from "./sections/IntroductionSection";
import MyProjectsSection from "./sections/MyProjectsSection";
import MySkillSection from "./sections/MySkillSection";

function Main() {
  return (
    <div className="px-[2rem] md:px-[3rem] lg:px-[5rem] xl:px-[10rem]">
      <IntroductionSection />
      <AboutSection />
      <MySkillSection />
      <MyProjectsSection />
      <ConnectSection />
    </div>
  );
}

export default Main;
