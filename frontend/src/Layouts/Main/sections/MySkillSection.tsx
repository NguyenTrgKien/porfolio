import htmlLogo from "../../../assets/images/html_logo.jpg";
import cssLogo from "../../../assets/images/css_logo.png";
import jsLogo from "../../../assets/images/js_logo.webp";
import typescriptLogo from "../../../assets/images/typescrip_logo.svg";
import reactLogo from "../../../assets/images/react_logo.png";
import tailwindLogo from "../../../assets/images/tailwind_logo.png";
import nodeLogo from "../../../assets/images/node_logo.png";
import nestLogo from "../../../assets/images/nest_logo.svg";
import mysqlLogo from "../../../assets/images/mysql_logo.png";
import mongodbLogo from "../../../assets/images/mongodb_logo.svg";
import postgresLogo from "../../../assets/images/postgresdb_logo.svg";
import gitLogo from "../../../assets/images/git_logo.png";
import vercelLogo from "../../../assets/images/vercel_logo.svg";
import renderLogo from "../../../assets/images/render_logo.png";
import AnimateMotion from "../../../components/AnimateMotion";
import { motion } from "framer-motion";

const skillsFrontend = [
  {
    id: 1,
    name: "HTML",
    image: htmlLogo,
  },
  {
    id: 2,
    name: "CSS",
    image: cssLogo,
  },
  {
    id: 3,
    name: "JS",
    image: jsLogo,
  },
  {
    id: 4,
    name: "TypeScript",
    image: typescriptLogo,
  },
  {
    id: 5,
    name: "React",
    image: reactLogo,
  },
  {
    id: 6,
    name: "Tailwindcss",
    image: tailwindLogo,
  },
];

const skillsBackend = [
  {
    id: 1,
    name: "NodeJS",
    image: nodeLogo,
  },
  {
    id: 2,
    name: "NestJS",
    image: nestLogo,
  },
  {
    id: 3,
    name: "MySQL",
    image: mysqlLogo,
  },
  {
    id: 4,
    name: "MongoDB",
    image: mongodbLogo,
  },
  {
    id: 4,
    name: "PostgresDB",
    image: postgresLogo,
  },
];

const skillsDevOps = [
  {
    id: 1,
    name: "Git",
    image: gitLogo,
  },
  {
    id: 2,
    name: "Vercel",
    image: vercelLogo,
  },
  {
    id: 3,
    name: "Render",
    image: renderLogo,
  },
];

function MySkillSection() {
  return (
    <section id="skills">
      <div className="text-center mt-[12rem]">
        <AnimateMotion delay={0.2}>
          <h3 className="text-[1.8rem] md:text-[2.8rem] ld:text-[3.4rem] font-bold">
            My Skills
          </h3>
        </AnimateMotion>
        <AnimateMotion delay={0.3}>
          <p className="mt-4 text-[1.2rem] md:text-[1.6rem]">
            Synthesis of skills and technologies that I have accumulates through
            many projects
          </p>
        </AnimateMotion>
      </div>
      <div className="mt-[6rem] grid grid-cols-2 md:grid-cols-4 gap-20 max-w-[80%] mx-auto text-[1.2rem] md:text-[1.4rem]">
        <div>
          <h3 className="text-[1.2rem] md:text-[1.6rem] font-bold ">
            Frontend
          </h3>
          <div className="space-y-8 mt-8">
            {skillsFrontend.map((it, index) => {
              return (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  key={it.id}
                  className="flex items-center gap-3"
                >
                  <img
                    src={it.image}
                    alt={it.name}
                    className="md:w-10 md:h-10 w-8 h-8 object-cover"
                  />{" "}
                  {it.name}
                </motion.div>
              );
            })}
          </div>
        </div>
        <div>
          <h3 className="text-[1.2rem] md:text-[1.6rem] font-bold ">Backend</h3>
          <div className="space-y-8 mt-8">
            {skillsBackend.map((it, index) => {
              return (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  key={it.id}
                  className="flex items-center gap-3"
                >
                  <img
                    src={it.image}
                    alt={it.name}
                    className="md:w-10 md:h-10 w-8 h-8 object-cover"
                  />{" "}
                  {it.name}
                </motion.div>
              );
            })}
          </div>
        </div>
        <div>
          <h3 className="text-[1.2rem] md:text-[1.6rem] font-bold ">
            DevOps/Deploy
          </h3>
          <div className="space-y-8 mt-8">
            {skillsDevOps.map((it, index) => {
              return (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  key={it.id}
                  className="flex items-center gap-3 "
                >
                  <img
                    src={it.image}
                    alt={it.name}
                    className="md:w-10 md:h-10 w-8 h-8 object-cover"
                  />{" "}
                  {it.name}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MySkillSection;
