import axiosPrivate from "@/axios/axiosPrivate";
import SearchSelector from "@/components/SearchSelector";
import Selector from "@/components/Selector";
import Watchlist from "@/pages/Watchlist";
import { Value } from "@radix-ui/react-select";
import React, { useEffect, useState } from "react";

const TradeSetup = ({ setPageState, setOpportunities, setLoading }) => {
  async function handleGetOpportunity(data) {
    try {
      setLoading(true);
      const res = await axiosPrivate.post("/get_opportunity", data);
      if (res.status === 200) {
        console.log("response on trade setup: ", res);

        setOpportunities(
          res.data.opportunity_lod.map((e, i) => ({
            id: e,
            value: `Opportunity ${i + 1}`,
          }))
        );
        setPageState(1);
      }
    } catch (error) {
      console.error("ERR::POST::OPPORTUNITY", error);
    } finally {
      setLoading(false);
    }
  }

  const handleRowClick = (record) => {
    handleGetOpportunity({
      ticker: record.Ticker,
      timeframe: record.Timeframe,
      direction: record.Direction,
    });
  };

  const handleRowClickNewTab = (record) => {
    sessionStorage.setItem("tradeData", JSON.stringify(record));
    const newTab = window.open("/dashboard", "_blank");

    if (newTab) {
      newTab.focus();
    }
  };

  useEffect(() => {
    const storedData = sessionStorage.getItem("tradeData");
    if (storedData) {
      sessionStorage.removeItem("tradeData");
      const record = JSON.parse(storedData);
      handleGetOpportunity({
        ticker: record.Ticker,
        timeframe: record.Timeframe,
        direction: record.Direction,
      });

    }
  }, []);

  return (
    <div className="w-full h-fit flex flex-col p-4">
      <h1 className="text-[11px] text-right mb-4">*Updated Once Daily</h1>
      <Watchlist handleRowClick={handleRowClick} newTab={handleRowClickNewTab} />
    </div>
  );
};
export default TradeSetup;
