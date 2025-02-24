import axiosPrivate from "@/axios/axiosPrivate";
import { Layout } from "@/components/Layout";
import PerformanceContainer from "@/components/PerformanceContainer";
import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";

const Performance = () => {
  const [allPerformance, setAllPerformance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const ITEMS_PER_PAGE = 10;

  async function getAllPerformance(task) {
    try {
      setLoading(true);
      const from = page * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE;

      const res = await axiosPrivate.get(
        `/get_performance_panel_all?from=${from}&to=${to}`
      );

      const newPerformances = res.data?.panel_lod || [];

      // Update state based on task
      setAllPerformance((prev) =>
        task === "refresh" ? newPerformances : [...prev, ...newPerformances]
      );

      // Check if there are more items
      setHasMore(res.data?.total > (page + 1) * ITEMS_PER_PAGE);
    } catch (error) {
      console.error("ERR::GET::ALL_PERFORMANCE", error);
    } finally {
      setLoading(false);
    }
  }

  function handleLoadMore() {
    setPage((prev) => prev + 1);
  }

  useEffect(() => {
    // Reset to first page when component mounts
    setPage(0);
    getAllPerformance("refresh");
  }, []);

  useEffect(() => {
    // Fetch data when page changes
    if (page > 0) {
      getAllPerformance();
    }
  }, [page]);

  const colorDirectionMap = {
    false: "#a6a6a6",
    true: "#22c55e",
  };

  return (
    <Layout>
      {loading && allPerformance.length === 0 ? (
        <div className="flex justify-center w-full p-10">
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
        <div className="h-full w-full mx-auto space-y-2">
          {allPerformance.length > 0 ? (
            <>
              {allPerformance.map((performance, index) => (
                <div
                  key={`${performance?.ticker}-${index}`}
                  className="border-2  rounded-sm p-5 flex items-center justify-between bg-white flex-wrap gap-y-5"
                >
                  <div className="flex gap-x-10 gap-y-3 uppercase font-semibold text-neutral-600 items-center flex-wrap">
                    <span
                  style={{ backgroundColor: colorDirectionMap[performance.panel?.tracking] }}
                    
                    className="h-3 w-3  rounded-full"></span>
                    <p title={performance?.panel?.opportunity_name} className="w-[5rem] truncate">{performance?.panel?.opportunity_name}</p>
                    <p className="w-[5rem]">{performance?.ticker}</p>
                    <p className="w-[5rem]">{performance?.panel?.timeframe}</p>

                    <p>{performance?.panel?.direction}</p>
                  </div>
                  <PerformanceContainer
                    color={performance?.panel?.color}
                    panel={performance?.panel?.panel}
                  />
                </div>
              ))}

              {hasMore && (
                <button
                  onClick={handleLoadMore}
                  className="w-full bg-blue-500 text-white py-2 rounded-md mt-4"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Load More"}
                </button>
              )}
            </>
          ) : (
            <div className="text-center">Nothing to Show Yet</div>
          )}
        </div>
      )}
    </Layout>
  );
};

export default Performance;
