import avatar from "../../../assets/images/avatar2.png";
import { useTheme } from "../../../hooks/useTheme";
import moonIcon from "../../../assets/images/moon_icon.png";
import sunIcon from "../../../assets/images/sun_icon.png";

function HeaderAdmin() {
  const { toggleTheme } = useTheme();

  return (
    <header className="w-full h-[6rem] shadow-md ml-auto flex items-center justify-between px-[2rem]">
      <div>
        <h2 className="text-[2rem] font-bold">Dashboard</h2>
      </div>
      <div className="flex items-center gap-6">
        <button
          className="relative w-[5.5rem] h-[2.8rem] rounded-full bg-gradient-to-r from-amber-300 to-orange-400 dark:from-slate-700 dark:to-slate-900 transition-all duration-300 shadow-md focus:outline-none p-1 border dark:border-gray-500 border-gray-200"
          onClick={toggleTheme}
        >
          <span className="block w-[2.2rem] h-[2.2rem] rounded-full bg-white dark:bg-gray-600 shadow transition-all duration-300 dark:translate-x-[2.6rem] flex items-center justify-center">
            <img src={sunIcon} alt="sun" className="w-4 dark:hidden" />
            <img src={moonIcon} alt="moon" className="w-4 hidden dark:block" />
          </span>
        </button>
        <img
          src={avatar}
          alt="avatar"
          className="w-12 h-12 rounded-full object-cover"
        />
      </div>
    </header>
  );
}

export default HeaderAdmin;
