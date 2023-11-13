import { useQuery } from "@apollo/client";
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
  console.log(data);
  return <div>Dashboard</div>;
};

export default Dashboard;
