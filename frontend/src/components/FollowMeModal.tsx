import {
  faFacebook,
  faGithub,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faAngleRight, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const socials = [
  {
    id: 1,
    name: "Github",
    link: "https://github.com/NguyenTrgKien",
    icon: faGithub,
    subTitle: "NguyenTrgKien",
    color: "from-gray-800 to-gray-600",
    iconColor: "text-white",
    hoverBorder: "hover:border-gray-400 dark:hover:border-gray-400",
  },
  {
    id: 2,
    name: "FaceBook",
    link: "https://www.facebook.com/kien.trung.732841",
    icon: faFacebook,
    subTitle: "Kiên Trung",
    color: "from-blue-600 to-blue-400",
    iconColor: "text-white",
    hoverBorder: "hover:border-blue-400 dark:hover:border-blue-400",
  },
  {
    id: 3,
    name: "Instagram",
    link: "https://www.instagram.com/trungkien4420/",
    icon: faInstagram,
    subTitle: "Kiên Trung",
    color: "from-pink-600 via-rose-500 to-orange-400",
    iconColor: "text-white",
    hoverBorder: "hover:border-pink-400 dark:hover:border-pink-400",
  },
];

function FollowMeModal({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 w-full h-full flex items-center justify-center bg-[#2e2e2e84]"
    >
      <div className="relative w-[40rem] h-auto bg-white dark:bg-gray-700 shadow-xl p-10 rounded-xl">
        <button
          type="button"
          className="absolute top-6 right-6 w-12 h-12 rounded-md flex items-center justify-center bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faClose} />
        </button>
        <p className="text-[1.2rem]">{t("contact_me")}</p>
        <h2 className="text-[2rem] font-bold">{t("follow_me")}</h2>
        <div className="mt-10 flex flex-col gap-5">
          {socials.map((social) => {
            return (
              <a
                href={social.link}
                key={social.id}
                target="_blank"
                className={`w-full h-auto border border-gray-200 dark:border-gray-500 ${social.hoverBorder} shadow-sm flex items-center justify-between p-4 rounded-2xl hover:-translate-y-1.5 hover:scale-[1.01] transition-discrete duration-300 hover:shadow-md`}
              >
                <div className="flex items-center gap-5">
                  <span
                    className={`w-16 h-16 rounded-2xl border bg-gradient-to-br border-gray-200 dark:border-gray-600 ${social.color} shadow-md flex items-center justify-center`}
                  >
                    <FontAwesomeIcon
                      icon={social.icon}
                      className={` ${social.iconColor}`}
                    />
                  </span>
                  <div>
                    <p className="text-[1.5rem] font-semibold">{social.name}</p>
                    <p className="text-[1.2rem] text-gray-500 dark:text-gray-400">
                      {social.subTitle}
                    </p>
                  </div>
                </div>
                <FontAwesomeIcon icon={faAngleRight} />
              </a>
            );
          })}
        </div>
        <p className="mt-8 text-center text-gray-600 dark:text-gray-400">
          {t("let_connect")}
        </p>
      </div>
    </motion.div>
  );
}

export default FollowMeModal;
