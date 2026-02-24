import sunIcon from "../assets/images/sun_icon.png";
import moonIcon from "../assets/images/moon_icon.png";
import { useTheme } from "../hooks/useTheme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

const nav_list = [
  {
    id: 1,
    name: "HOME",
    link: "home",
  },
  {
    id: 2,
    name: "ABOUT",
    link: "about",
  },
  {
    id: 3,
    name: "SKILLS",
    link: "skills",
  },
  {
    id: 4,
    name: "PROJECTS",
    link: "projects",
  },
  {
    id: 5,
    name: "CONTACT",
    link: "contact",
  },
];

function Header() {
  const { toggleTheme } = useTheme();
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <footer className="fixed top-0 left-0 w-full h-[6rem] flex items-center justify-between z-[900] bg-white dark:bg-[#000029] px-[2rem] md:px-[3rem] lg:px-[5rem] xl:px-[10rem] transition-colors duration-500 shadow-md">
      <div>
        <h2 className="text-[1.8rem] sm:text-[2rem] md:text-[2.2rem] font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent tracking-wide">
          NT.Kiên
        </h2>
      </div>
      <nav className="hidden relative md:flex items-center gap-5 md:gap-10 lg:gap-20">
        {nav_list.map((it) => {
          return (
            <a
              href={`#${it.link}`}
              key={it.id}
              className="relative group cursor-pointer block hover:text-amber-500 transition-col duration-200"
            >
              {it.name}
            </a>
          );
        })}
      </nav>

      <div className="flex items-center gap-5">
        <button
          className="relative w-[5.5rem] h-[2.8rem] rounded-full bg-gradient-to-r from-amber-300 to-orange-400 dark:from-slate-700 dark:to-slate-900 transition-all duration-300 shadow-md focus:outline-none p-1 border dark:border-gray-500 border-gray-200"
          onClick={toggleTheme}
        >
          <span className="block w-[2.2rem] h-[2.2rem] rounded-full bg-white dark:bg-gray-600 shadow transition-all duration-300 dark:translate-x-[2.6rem] flex items-center justify-center">
            <img src={sunIcon} alt="sun" className="w-4 dark:hidden" />
            <img src={moonIcon} alt="moon" className="w-4 hidden dark:block" />
          </span>
        </button>
        <button className="hidden md:block px-6 py-2 bg-amber-500 hover:bg-amber-600 rounded-md text-white">
          login
        </button>

        <button
          className="md:hidden text-[2rem]"
          onClick={() => setOpenMenu(!openMenu)}
        >
          <FontAwesomeIcon icon={openMenu ? faClose : faBars} />
        </button>
      </div>

      <AnimatePresence>
        {openMenu && (
          <div className="fixed md:hidden inset-0 w-full h-full z-[900]">
            <div
              className="absolute inset-0 bg-[#2a2a2a65]"
              onClick={() => setOpenMenu(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute w-[70%] h-full top-0 right-0 bg-white dark:bg-[#000029] shadow-md flex flex-col items-start gap-10 p-10"
            >
              <button
                className="absolute top-3 right-3 text-[2rem]"
                onClick={() => setOpenMenu(false)}
              >
                <FontAwesomeIcon icon={faClose} />
              </button>

              {nav_list.map((it) => (
                <a
                  href={`#${it.link}`}
                  key={it.id}
                  onClick={() => setOpenMenu(false)}
                  className="cursor-pointer hover:text-amber-500 transition-colors duration-200"
                >
                  {it.name}
                </a>
              ))}

              <button className="px-6 py-2 bg-amber-500 hover:bg-amber-600 rounded-md text-white">
                login
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}

export default Header;
