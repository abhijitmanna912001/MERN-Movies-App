import { useState } from "react";
import Main from "./main/Main";
import Sidebar from "./sidebar/Sidebar";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <Main className="flex-1 overflow-y-auto h-screen p-4" />
    </div>
  );
};

export default AdminDashboard;
