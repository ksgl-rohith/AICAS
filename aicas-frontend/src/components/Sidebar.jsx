import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-black text-white flex flex-col h-screen">
      <h1 className="text-xl font-bold p-6">
        AICAS
      </h1>

      <nav className="flex flex-col gap-4 px-6">
        <Link to="/" className="text-white hover:text-gray-400 transition-colors">
          Dashboard
        </Link>
        <Link to="/create" className="text-white hover:text-gray-400 transition-colors">
          Create Campaign
        </Link>
        <Link to="/history" className="text-white hover:text-gray-400 transition-colors">
          Campaign History
        </Link>
        <Link to="/platforms" className="text-white hover:text-gray-400 transition-colors">
          Platforms
        </Link>
        <Link to="/logs" className="text-white hover:text-gray-400 transition-colors">
          Logs
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
