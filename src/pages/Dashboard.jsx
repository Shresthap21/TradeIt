import React, { useState } from "react";
import TradeSetup from "../screens/TradeSetup";
import { Layout } from "../components/Layout";
import GraphScreen from "@/screens/GraphScreen";
import { useDashboardContext } from "@/lib/context/DashboardContext";
import { Oval } from "react-loader-spinner";
export const Dashboard = () => {
  const [opportunities, setOpportunities] = useState([]);
  const { pageState, setPageState } = useDashboardContext();
  const [loading, setLoading] = useState(false);
  return (
    <Layout>
      {loading ? (
        <div className="flex-1  flex justify-center items-center">

        <Oval
                  visible={true}
                  height="35"
                  width="35"
                  color="#94a3b8"
                  strokeWidth={4}
                  secondaryColor="#"
                  />
                  </div>
      ) : (
        <>
          {pageState === 0 ? (
            <TradeSetup
              setPageState={setPageState}
              setOpportunities={setOpportunities}
              setLoading={setLoading}
            />
          ) : (
            <GraphScreen
              opportunities={opportunities}
              setOpportunities={setOpportunities}
            />
          )}
        </>
      )}
    </Layout>
  );
};
