function SidebarAdmin() {
  return (
    <div className="hidden md:block md:w-[20rem] lg:w-[24rem] h-[100vh] shadow-md border-r border-r-gray-200 dark:border-r-gray-600 flex flex-col">
      <div className="text-center p-4 md:p-8 bg-blue-500 text-white font-bold uppercase text-[1.2rem] md:text-[1.4rem] truncate">
        <span className="hidden md:inline">Admin</span>
        <span className="md:hidden">A</span>
      </div>
      <div className="p-2 md:p-8 text-center">
        <div className="border border-blue-500 text-blue-500 rounded-[1.6rem] p-2 md:p-4 text-[1.2rem] md:text-[1.4rem]">
          <span className="hidden md:inline">Chat</span>
          <span className="md:hidden">💬</span>
        </div>
      </div>
    </div>
  );
}

export default SidebarAdmin;
