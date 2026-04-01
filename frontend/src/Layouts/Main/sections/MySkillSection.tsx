import AnimateMotion from "../../../components/AnimateMotion";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  skillsBackend,
  skillsDevOps,
  skillsFrontend,
} from "../../../data/skills";

interface Skill {
  id: number;
  name: string;
  image: string;
}

function SkillGroup({ title, skills }: { title: string; skills: Skill[] }) {
  return (
    <div>
      <h3 className="text-[1.2rem] md:text-[1.6rem] font-bold">{title}</h3>
      <div className="space-y-8 mt-8">
        {skills.map((it, index) => (
          <motion.div
            key={it.id}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex items-center gap-3"
          >
            <img
              src={it.image}
              alt={it.name}
              className="md:w-10 md:h-10 w-8 h-8 object-contain"
            />
            {it.name}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function MySkillSection() {
  const { t } = useTranslation();
  return (
    <section id="skills">
      <div className="text-center mt-[12rem]">
        <AnimateMotion delay={0.2}>
          <h3 className="text-[1.8rem] md:text-[2.8rem] ld:text-[3.4rem] font-bold">
            {t(`my_skill.${"title"}`)}
          </h3>
        </AnimateMotion>
        <AnimateMotion delay={0.3}>
          <p className="mt-4 text-[1.2rem] md:text-[1.6rem]">
            {t(`my_skill.${"sub_title"}`)}
          </p>
        </AnimateMotion>
      </div>
      <div className="mt-[6rem] grid grid-cols-2 md:grid-cols-3 gap-20 max-w-[80%] mx-auto text-[1.2rem] md:text-[1.4rem]">
        <SkillGroup title="Frontend" skills={skillsFrontend} />
        <SkillGroup title="Backend" skills={skillsBackend} />
        <SkillGroup title="DevOps/Deploy" skills={skillsDevOps} />
      </div>
    </section>
  );
}

export default MySkillSection;
