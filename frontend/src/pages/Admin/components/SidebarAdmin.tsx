function SidebarAdmin() {
  return (
    <div className="w-[24rem] h-[100vh] shadow-md border-r border-r-gray-200">
      <div className="text-center p-8 bg-blue-500 text-white font-bold uppercase">
        Admin
      </div>
      <div className="p-8 text-center">
        <div className="border border-blue-500 text-blue-500 rounded-2xl p-4">
          Chat
        </div>
      </div>
    </div>
  );
}

export default SidebarAdmin;
