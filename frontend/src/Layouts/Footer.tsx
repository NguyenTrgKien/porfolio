import { faFacebookF, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import {
  faCircle,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Footer() {
  return (
    <footer
      id="projects"
      className="bg-[#000029] px-[2rem] md:px-[3rem] lg:px-[5rem] xl:px-[10rem] py-[4rem] text-gray-200"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-15 md:gap-8">
        <div className="space-y-6 text-center md:text-start">
          <h2 className="text-[3rem] font-bold font-mono">Trung Kiên</h2>
          <p>Backend developer</p>
          <div className="flex items-center justify-center md:justify-start gap-4 ">
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
        </div>
        <div className="space-y-8 text-center md:text-start">
          <h4 className="font-bold text-[1.6rem]">Navigation</h4>
          <div className="flex flex-col items-center md:items-start space-y-4">
            <a href="#home" className="flex items-center space-x-2.5">
              <FontAwesomeIcon icon={faCircle} className="text-[.4rem]" />
              <span>Home</span>
            </a>
            <a href="#about" className="flex items-center space-x-2.5">
              <FontAwesomeIcon icon={faCircle} className="text-[.4rem]" />
              <span>About</span>
            </a>
            <a href="#skills" className="flex items-center space-x-2.5">
              <FontAwesomeIcon icon={faCircle} className="text-[.4rem]" />
              <span>Skills</span>
            </a>
            <a href="#projects" className="flex items-center space-x-2.5">
              <FontAwesomeIcon icon={faCircle} className="text-[.4rem]" />
              <span>Projects</span>
            </a>
            <a href="#contact" className="flex items-center space-x-2.5">
              <FontAwesomeIcon icon={faCircle} className="text-[.4rem]" />
              <span>Contact</span>
            </a>
          </div>
        </div>
        <div className="space-y-8 text-center md:text-start">
          <h4 className="font-bold text-[1.6rem]">Projects</h4>
          <div className="flex flex-col items-center md:items-start space-y-4">
            <a href="#projects" className="flex items-center space-x-2.5">
              <FontAwesomeIcon icon={faCircle} className="text-[.4rem]" />
              <span>E-Commerce App</span>
            </a>
            <a href="#projects" className="flex items-center space-x-2.5">
              <FontAwesomeIcon icon={faCircle} className="text-[.4rem]" />
              <span>Portfolio Website</span>
            </a>
            <a href="#projects" className="flex items-center space-x-2.5">
              <FontAwesomeIcon icon={faCircle} className="text-[.4rem]" />
              <span>Chat Application</span>
            </a>
          </div>
        </div>
        <div className="space-y-8 text-center md:text-start">
          <h4 className="font-bold text-[1.6rem]">Get In Touch</h4>
          <div className="flex flex-col space-y-4 items-center md:items-start">
            <div className="flex items-center  gap-2.5">
              <span className="p-1.5 rounded-xl border border-gray-600">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
              <span>nguyentrungkien040921@gmail.com</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-xl border border-gray-600">
                <FontAwesomeIcon icon={faPhone} />
              </span>
              <span>0257 124 852</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-xl border border-gray-600">
                <FontAwesomeIcon icon={faLocationDot} />
              </span>
              <span>Cai Rang, Can Tho City</span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full border-t border-t-gray-700 my-[2rem]"></div>
      <div className="md:flex md:items-center md:justify-between text-center">
        <p>2026 Trung Kiên, All rights reserved.</p>
        <p>Crafted with ❤️ and in Can Tho City</p>
      </div>
    </footer>
  );
}

export default Footer;
