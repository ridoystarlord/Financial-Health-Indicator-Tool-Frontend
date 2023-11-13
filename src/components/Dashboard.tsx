import { useQuery } from "@apollo/client";
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Link } from "react-router-dom";
import { GET_COMPANY_HEALTH_SCORE } from "../mutations/company";
import { getToken } from "../utils/common";

const Dashboard = () => {
  const token = getToken();
  const { data } = useQuery(GET_COMPANY_HEALTH_SCORE, {
    context: {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    },
  });
  const [series, setSeries] = useState<{ name: string; data: number[] }[]>([]);

  const [options, setOptions] = useState<ApexOptions>({
    chart: {
      type: "area",
      height: 350,
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },

    title: {
      text: "Financial Health Score",
      align: "left",
    },
    labels: [],
    xaxis: {
      type: "category",
    },
    yaxis: {
      opposite: false,
      min: 0,
      max: 4,
    },
    legend: {
      horizontalAlign: "left",
    },
  });
  useEffect(() => {
    if (data && data?.getCompanyHealthData?.length) {
      const healthScoreData = [];
      const levels: string[] = [];
      for (let i = 0; i < data?.getCompanyHealthData.length; i++) {
        const item = data?.getCompanyHealthData[i];
        levels.push(item.monthName);
        healthScoreData.push(item.healthScore);
      }
      setOptions((prev) => {
        return { ...prev, labels: [...levels] };
      });
      setSeries([{ name: "Health Score", data: healthScoreData }]);
    }
  }, [data]);

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
            <ReactApexChart
              options={options}
              series={series}
              type="area"
              height={350}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
