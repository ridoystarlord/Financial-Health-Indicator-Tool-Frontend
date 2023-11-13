import { Link } from "react-router-dom";
import MonthlyForm from "./MonthlyForm";

const Analyze = () => {
  return (
    <>
      <div className="flex h-screen">
        {/* Left Sidebar */}
        <div className="w-1/8 bg-slate-800 text-white p-8">
          <h2 className="text-2xl font-bold mb-8">FHS</h2>
          <nav>
            <ul>
              <li className="mb-2">
                <Link
                  to="/dashboard"
                  className="text-gray-300 hover:text-white"
                >
                  Dashboard
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/dashboard/history"
                  className="text-gray-300 hover:text-white"
                >
                  Analyze
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Title Bar */}
          <div className="bg-slate-800 text-white  p-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            {/* Add any other title bar content here */}
          </div>

          {/* Middle Content */}

          <div className="flex-1 overflow-x-hidden overflow-y-auto p-4">
            <MonthlyForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Analyze;
