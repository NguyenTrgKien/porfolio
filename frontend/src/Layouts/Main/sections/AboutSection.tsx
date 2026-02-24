import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import avatar from "../../../assets/images/avatar2.png";
import {
  faEnvelope,
  faHome,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import {
  faBriefcase,
  faDownload,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const infoUser = [
  {
    id: 1,
    title: "Name",
    description: "Nguyễn Trung Kiên",
    icon: faUser,
  },
  {
    id: 2,
    title: "Location",
    description: "Cai Rang, Can Tho City",
    icon: faLocationDot,
  },
  {
    id: 3,
    title: "Email",
    description: "nguyentrungkien040921@gmail.com",
    icon: faEnvelope,
  },
  {
    id: 4,
    title: "Studing At",
    description: "Tay Do University, Can Tho City",
    icon: faHome,
  },
  {
    id: 5,
    title: "Phone",
    description: "0357 124 853",
    icon: faPhone,
  },
  {
    id: 6,
    title: "Profession",
    description: "Student",
    icon: faBriefcase,
  },
];

function AboutSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: 0.2 }}
    >
      <section
        id="about"
        className="grid grid-col-1 sm:grid-cols-[1fr_2fr] xl:grid-cols-2 gap-[2rem] items-center"
      >
        <h3 className="block sm:hidden text-[1.8rem] font-bold mb-2 text-center">
          About Me
        </h3>

        <div className="xl:w-[40rem] xl:h-[45rem] w-[20rem] h-[20rem] rounded-full mx-auto shadow-xl border border-gray-100 xl:rounded-xl sm:mb-0 mb-2">
          <img
            src={avatar}
            alt="image"
            className="w-full h-full object-cover rounded-full xl:rounded-xl"
          />
        </div>
        <div>
          <h3 className="hidden sm:block md:text-[2.8rem] ld:text-[3.4rem] font-bold mb-8">
            About Me
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {infoUser.map((it) => {
              return (
                <div
                  key={it.id}
                  className="flex items-center gap-6 p-5 border border-gray-600 rounded-xl hover:-translate-y-1.5 transition-discrete duration-300 cursor-default text-[1.2rem] md:text-[1.4rem]"
                >
                  <FontAwesomeIcon icon={it.icon} />
                  <div className="w-full">
                    <p className="font-bold">{it.title}</p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {it.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-12 flex items-center justify-center sm:justify-start">
            <button className="px-8 py-3.5 flex items-center gap-2.5 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors duration-300 text-[1.2rem] md:text-[1.4rem]">
              <FontAwesomeIcon icon={faDownload} />
              <span>Download My Cv</span>
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

export default AboutSection;
