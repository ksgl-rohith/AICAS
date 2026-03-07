import Sidebar from "../Sidebar";
import Navbar from "../Navbar";

const Layout = ({ children }) => {

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}

      <Sidebar />

      {/* Main Area */}

      <div className="flex flex-col flex-1">

        <Navbar />

        <main className="p-6 overflow-y-auto">
          {children}
        </main>

      </div>

    </div>
  );
};

export default Layout;