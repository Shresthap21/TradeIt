import axiosPrivate from "@/axios/axiosPrivate";
import DualLineChart from "@/components/DualLineChart";
import { Layout } from "@/components/Layout";
import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { toast } from "react-toastify";

const BreadthIndicators = () => {
  const [macroData, setMacroData] = useState({
    metric_dict: {},
  });
  const [tracking, setTracking] = useState(false);
  const [loading, setLoading] = useState(true);

  const getMacroData = async () => {
    try {
      setLoading(true);
      const res = await axiosPrivate.get("/get_macro_data");
      setMacroData(res.data);
      setTracking(res.data.tracking);
      console.log(res.data);
    } catch (error) {
      console.error("ERR::GET::MACRO_DATA", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTrack = async () => {
    try {
      const url = tracking ? "/untrack_macro_data" : "/track_macro_data";
      const res = await axiosPrivate.get(url);
      if (res.status === 200) {
        toast.info(res.data.msg);
         setTracking(prev=>!prev);
      }
      console.log(res);
    } catch (error) {
      console.error("ERR::TOGGLE_TRACK", error);
    }
  };

  useEffect(() => {
    getMacroData();
  }, []);

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
        <div className="w-full h-fit flex flex-col gap-y-12">
          <h1 className="text-right text-sm flex flex-col items-end gap-y-3">
            Last Updated: {macroData?.update_date}
          </h1>
          <h1 className="text-lg space-y-6">
            <button
              onClick={toggleTrack}
              className="text-sm float-right disabled:bg-slate-500 bg-[#1F2937] text-white font-medium  py-2 px-7 rounded-md shadow active:scale-95 transition transform duration-150 w-fit"
            >
              {tracking ? "Untrack" : "Track"}
            </button>
            {Object.entries(macroData?.df_index_description)[0][0]}
            <p className="text-sm text-neutral-500 font-normal">
              {Object.entries(macroData?.df_index_description)[0][1]}
            </p>
          </h1>
          <div className="border rounded-md p-5">
            <DualLineChart
              line1Data={macroData.df_index}
              line2Data={[]}
              oversoldData={macroData.oversold_idx}
              overboughtData={macroData.overbought_idx}
            />
          </div>
          {Object.entries(macroData.metric_dict).map((item, index) => {
            return (
              <div className="border rounded-md p-5">
                <h1 className="text-lg">{item[0]}</h1>
                <p className="text-sm text-neutral-500">
                  {macroData?.metric_description[item[0]]}
                </p>
                {
                  <DualLineChart
                    key={index}
                    line1Data={macroData.df_index}
                    line2Data={item[1]}
                    oversoldData={[]}
                    overboughtData={[]}
                    threshold={macroData?.metric_thresholds[item[0]]}
                  />
                }
              </div>
            );
          })}
        </div>
      )}
    </Layout>
  );
};

export default BreadthIndicators;
