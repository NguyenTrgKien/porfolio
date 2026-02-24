import { Outlet } from "react-router-dom";
import HeaderAdmin from "./components/HeaderAdmin";
import SidebarAdmin from "./components/SidebarAdmin";

function AdminPage() {
  return (
    <div className="flex w-full h-full text-[1.4rem] font-extralight dark:bg-[#000033] text-gray-800 dark:text-white transition-colors duration-500">
      <SidebarAdmin />
      <div className="flex-1">
        <HeaderAdmin />
        <main className="p-[2rem] ">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminPage;
