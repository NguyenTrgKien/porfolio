import AnimateMotion from "../../../components/AnimateMotion";
import manageClothes from "../../../assets/images/manage_clothes.png";
import { Link } from "react-router-dom";

const projects = [
  {
    id: 1,
    name: "Clothing Sales Manager",
    image: manageClothes,
    description:
      "Clothing Sales Manager is a web application that helps manage clothing products, inventory, orders, and customer information in a retail store.",
    techs: ["JS", "React", "NestJS", "PostgresSQL", "Redis"],
    demoUrl: "https://nguyentrgkien.github.io/manage-sell-client/",
    githubUrl: "https://github.com/NguyenTrgKien/manage-sell-client.git",
  },
];

function MyProjectsSection() {
  return (
    <section id="projects">
      <div className="text-center mt-[12rem]">
        <AnimateMotion delay={0.2}>
          <h3 className="text-[1.8rem] md:text-[2.8rem] ld:text-[3.4rem] font-bold">
            My Projects
          </h3>
        </AnimateMotion>
        <AnimateMotion delay={0.3}>
          <p className="text-[1.2rem] md:text-[1.6rem] mt-4">
            Explore the innovative projects and technology solutions I have
            developed
          </p>
        </AnimateMotion>
      </div>
      <div className="mt-[2rem] md:mt-[4rem] text-center">
        <AnimateMotion delay={0.4}>
          <button className="px-8 py-3.5 text-[1.2rem] md:text-[1.4rem] rounded-full bg-blue-500 text-white">
            Web Development
          </button>
        </AnimateMotion>
        <AnimateMotion delay={0.5}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-[3rem] md:mt-[5rem]">
            {projects.map((pro) => {
              return (
                <div
                  key={pro.id}
                  className="rounded-2xl transition-discrete duration-300 text-start dark:border dark:border-gray-500 hover:-translate-y-5 shadow-xl text-[1.2rem] md:text-[1.4rem]"
                >
                  <img
                    src={pro.image}
                    alt={pro.name}
                    className="w-full h-[25rem] object-cover rounded-tr-2xl rounded-tl-2xl"
                  />
                  <div className="p-6 space-y-4">
                    <p className="md:text-[1.6rem] lg:text-[1.8rem] text-gray-900 dark:text-gray-200 font-bold">
                      {pro.name}
                    </p>
                    <p className="text-gray-800 dark:text-gray-400">
                      {pro.description}
                    </p>
                    <p className="text-gray-800 dark:text-gray-200 font-bold">
                      Technologies:
                    </p>
                    <div className="space-x-2.5 space-y-2.5 flex items-center flex-wrap">
                      {pro.techs.map((tech, index) => {
                        return (
                          <span
                            key={index}
                            className="px-5 py-2 font-bold rounded-full bg-gray-200 dark:bg-gray-600 dark:text-gray-200 text-gray-600 transition-colors duration-300"
                          >
                            {tech}
                          </span>
                        );
                      })}
                    </div>
                    <span className="block w-full border-t border-t-gray-400 my-10"></span>
                    <div className="grid grid-cols-2 items-center gap-4">
                      <Link
                        to={pro.demoUrl}
                        className="flex items-center justify-center w-full py-3.5 bg-amber-500 outline-none rounded-full hover:bg-amber-600 transition-colors duration-300 text-white"
                      >
                        Live Demo
                      </Link>
                      <Link
                        to={pro.githubUrl}
                        className="flex items-center justify-center w-full py-3.5 border-1 border-blue-600 text-blue-600 outline-none rounded-full dark:border-white dark:text-white"
                      >
                        GitHub
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </AnimateMotion>
      </div>
    </section>
  );
}

export default MyProjectsSection;
