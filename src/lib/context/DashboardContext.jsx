import React, { createContext, useContext, useState } from "react";

// Create the context
const DashboardContext = createContext();

// Create the provider
export const DashboardProvider = ({ children }) => {
  const [pageState, setPageState] = useState(0); // Default page state
  const [refreshState, setRefreshState] = useState(false); // Default refresh state
  const [selectedOpportunity, setSelectedOpportunity] = useState({});
  const [selectedOpportunityId, setSelectedOpportunityId] = useState("");
  const [showRiskModal, setShowRiskModal] = useState(false);
  const [retrieveSelectedOpportunityData, setRetrieveSelectedOpportunityData] =
    useState({});

  const toggleRefreshState = () => {
    setRefreshState((prev) => !prev); // Toggle the refresh state
  };

  return (
    <DashboardContext.Provider
      value={{
        pageState,
        setPageState,
        refreshState,
        setRefreshState,
        toggleRefreshState,
        setSelectedOpportunity,
        selectedOpportunity,
        selectedOpportunityId,
        setSelectedOpportunityId,
        showRiskModal,
        setShowRiskModal,
        retrieveSelectedOpportunityData,
        setRetrieveSelectedOpportunityData
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

// Custom hook to use the context
export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error(
      "useDashboardContext must be used within a DashboardProvider"
    );
  }
  return context;
};
