import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useTyped from "../../../hooks/useTyped";
import { faFacebookF, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import avatar from "../../../assets/images/avatar2.png";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

function IntroductionSection() {
  const typedRef = useTyped({
    strings: ["Student", "Backend Developer"],
    typeSpeed: 60,
    backSpeed: 50,
    loop: true,
    smartBackspace: true,
  });

  return (
    <section
      id="home"
      className="w-full h-[calc(100vh)] flex flex-col flex-col-reverse justify-center items-center md:grid md:grid-cols-2 items-center gap-[4rem] md:gap-[2rem] md:py-[16rem]"
    >
      <motion.div
        initial={{ opacity: 0, transform: "translateX(-40%)" }}
        animate={{ opacity: 1, transform: "translateX(0)" }}
        transition={{ duration: 1 }}
      >
        <div>
          <p className="md:text-[1.6rem] lg:text-[2rem] md:font-bold md:text-start text-center">
            Hello My name is
          </p>
          <h2 className="text-[3rem] md:text-[4rem] lg:text-[6rem] font-semibold font-mono md:text-start text-center">
            Nguyễn Trung Kiên
          </h2>
          <div className="flex items-center justify-center md:justify-start md:text-[1.6rem] lg:text-[2rem]">
            <p className=" font-bold mr-3">I'm a</p>
            <p className=" font-bold text-cyan-500" ref={typedRef}></p>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-6 mt-14">
            <a
              href={"https://www.facebook.com/kien.trung.732841"}
              className="w-12 h-12 rounded-full flex items-center justify-center border dark:border-white"
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </a>

            <a
              href={`mailto:nguyentrungkien040921@gmail.com`}
              className="w-12 h-12 rounded-full flex items-center justify-center border dark:border-white"
            >
              <FontAwesomeIcon icon={faEnvelope} />
            </a>

            <a
              href={`https://github.com/NguyenTrgKien`}
              className="w-12 h-12 rounded-full flex items-center justify-center border dark:border-white"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </div>

          <div className="text-[1.2rem] sm:text-[1.4rem] flex md:flex-row flex-col items-center gap-4 mt-14">
            <a
              href="#projects"
              className="px-10 py-3.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white uppercase  transition-colors duration-300 cursor-pointer space-x-2.5"
            >
              <span>view projects</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </a>
            <a
              href="#contact"
              className="px-10 py-3.5 rounded-full border hover:bg-amber-500 border-amber-500 text-amber-600 dark:text-white uppercase hover:text-white transition-colors duration-300 cursor-pointer space-x-2.5"
            >
              <span>contact me</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </a>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, transform: "translateY(40%)" }}
        animate={{ opacity: 1, transform: "translateY(0)" }}
        transition={{ duration: 1 }}
      >
        <div className="rounded-full lg:w-[42rem] lg:h-[42rem] md:w-[38rem] md:h-[38rem] w-[21rem] h-[21rem] flex items-center justify-center bg-gradient-to-tr from-amber-200 to-amber-600 mx-auto my-auto hover:-translate-y-5 transition-discrete duration-300 shadow-md shadow-amber-200">
          <div className="rounded-full lg:w-[40rem] lg:h-[40rem] md:w-[36rem] md:h-[36rem] w-[20rem] h-[20rem] overflow-hidden bg-white ">
            <img
              src={avatar}
              alt="main image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default IntroductionSection;
