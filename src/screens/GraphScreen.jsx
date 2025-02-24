import React, { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";
import Selector from "@/components/Selector";
import axiosPrivate from "@/axios/axiosPrivate";
import CheckboxCom from "@/components/CheckboxCom";
import RadioBtnGrup from "@/components/RadioBtnGrup";
import { toast } from "react-toastify";
import { useDashboardContext } from "@/lib/context/DashboardContext";
import { useConfirmation } from "@/lib/context/ConfirmationContext";
import PerformanceContainer from "@/components/PerformanceContainer";
import PastActivity from "@/components/PastActivity";
import { Oval } from "react-loader-spinner";
import CandlestickChart from "@/components/CandlestickChart";
import { BsQuestionCircleFill } from "react-icons/bs";
import TooltipWrapper from "@/components/TooltipWrapper";
import CandlestickChart2 from "@/components/CandlestickChart2";
import CalculateRiskModal from "@/components/CalculateRiskModal";
import { Tooltip } from "antd";

const GraphScreen = ({ opportunities = [], setOpportunities }) => {
  const {
    toggleRefreshState,
    setSelectedOpportunityId,
    selectedOpportunityId,
    selectedOpportunity,
    setSelectedOpportunity,
    refreshState,
    showRiskModal,
    setShowRiskModal,
  } = useDashboardContext();
  const [formData, setFormData] = useState({
    opportunity_dict: {},
    use_advanced_entry: false,
  });
  const [track, setTrack] = useState("Track");
  const chartContainerRef = useRef(null);
  const { showConfirmation } = useConfirmation();
  const [candlestickFormData, setCandletickFormData] = useState({
    ticker: "",
    timeframe: "",
  });
  const [retrieveSelectedOpportunityData, setRetrieveSelectedOpportunityData] =
    useState({});
  const [performanceData, setPerformanceData] = useState({});
  const [loading, setLoading] = useState(false);
  const [findApi, setFindApi] = useState(0); // 0 - get opp & 1 - retrieve opp
  const [candlestickData, setCandlestickData] = useState([]);
  const [annotationsData, setAnnotationsData] = useState({
    buyZoneData: [],
    stopLossData: [],
    targetLevels: [],
    anchorSupport: [],
  });
  const [calculateRiskData, setCalculateRiskData] = useState({});
  const [showModal, setShowModal] = useState(false);

  const riskColorMap = {
    high: "#ef4444",
    medium: "#f97316",
    low: "#22c55e",
  };
  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  async function handleTrack() {
    try {
      const data = { ...formData };
      data.opportunity_dict =
        Object.keys(formData.opportunity_dict).length > 0
          ? formData.opportunity_dict
          : selectedOpportunity;
      const res = await axiosPrivate.post("/append_to_opportunity_db", data);
      if (res.status === 200) {
        toast.info(res.data.msg);
        if (res.data.code === 0) {
          setSelectedOpportunity({
            ...formData.opportunity_dict,
            tracking: true,
          });
          setSelectedOpportunityId(res.data.opportunity_id);
          toggleRefreshState();
          setTrack("Untrack");
        }
      }
    } catch (error) {
      console.error("ERR::POST::TRACK", error);
    }
  }
  async function handleUntrack() {
    try {
      const res = await axiosPrivate.post("/untrack_opportunity", {
        opportunity_id: selectedOpportunityId,
      });
      if (res.status === 200) {
        toast.info(res.data.msg);
        setSelectedOpportunity({
          ...formData.opportunity_dict,
          tracking: false,
        });
        toggleRefreshState();
        setTrack("Track");
      }
    } catch (error) {
      console.error("ERR::POST::UNTRACK", error);
    }
  }
  async function getPerformance() {
    try {
      setLoading(true);
      const res = await axiosPrivate.post("/get_performance_panel_single", {
        opportunity_id: selectedOpportunityId,
      });

      if (res.status === 200) {
        setPerformanceData(res?.data?.panel_dict);
      }
    } catch (error) {
      console.error("ERR::POST::GET_PERFORMANCE_PANEL");
    } finally {
      setLoading(false);
    }
  }
  async function retrieveOpportunity() {
    try {
      setOpportunities([]);
      setLoading(true);
      const res = await axiosPrivate.post("/retrieve_opportunity", {
        opportunity_id: selectedOpportunityId,
      });

      if (res.status === 200) {
        const data = res?.data?.opportunity;
        setRetrieveSelectedOpportunityData(data);
        setCalculateRiskData({
          stop_loss: data?.misc_info?.stop_loss,
          current_price: data?.current_price,
          target_level: data?.misc_info?.primary_target,
        });
        setCandlestickData(
          res?.data?.df.map((e) => ({
            ...e,
            Date: parseInt(e.Date),
            Close: parseFloat(e.Close.toFixed(2)),
            High: parseFloat(e.High.toFixed(2)),
            Low: parseFloat(e.Low.toFixed(2)),
            Open: parseFloat(e.Open.toFixed(2)),
          }))
        );
        const opportunity = res?.data?.opportunity;

        const lastDate = parseInt(res.data.df[res.data.df.length - 1]?.Date);
        const startDate = parseInt(res.data.df[0]?.Date);
        const pivotTimestamp = parseInt(opportunity.pivot_timestamp);
        const anchorTimestamp = parseInt(opportunity.anchor_timestamp);
        setAnnotationsData({
          pivotTimestamp,
          anchorTimestamp,
          yRange: opportunity.yrange,
          buyZoneData: [
            {
              x1: pivotTimestamp,
              x2: lastDate,
              y1: opportunity?.buy_zone[0],
              y2: opportunity?.buy_zone[1],
            },
          ],
          stopLossData: [
            {
              x1: anchorTimestamp,
              x2: lastDate,
              y: opportunity?.misc_info?.stop_loss,
            },
          ],
          targetLevels: opportunity.target_levels.map((e) => ({
            x1: pivotTimestamp,
            x2: lastDate,
            y: e[1],
            name: e[0],
          })),
          anchorSupport: opportunity.resistances_broken.map((e) => ({
            x1: startDate,
            x2: anchorTimestamp,
            y: e[1],
            name: e[0],
          })),
          anchorSrLod: opportunity?.anchor_sr_lod?.map((e) => ({
            x1: startDate,
            x2: anchorTimestamp,
            y: e?.sr,
            name: e.name,
          })),
        });
      }
    } catch (error) {
      console.error("ERR::POST::RETRIEVE_OPPORTUNITY", error);
    } finally {
      setLoading(false);
    }
  }
  function handleRadioGrup(e) {
    const { name, value } = e.target;
    setCandletickFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  async function getCandlestickCharData() {
    try {
      const res = await axiosPrivate.post(
        "/get_candlestick_chart",
        candlestickFormData
      );
      setCandlestickData(
        res?.data?.df.map((e) => ({
          ...e,
          Date: parseInt(e.Date),
          Close: parseFloat(e.Close.toFixed(2)),
          High: parseFloat(e.High.toFixed(2)),
          Low: parseFloat(e.Low.toFixed(2)),
          Open: parseFloat(e.Open.toFixed(2)),
        }))
      );
      setAnnotationsData((prev) => ({
        ...prev,
        yRange: res?.data?.yrange,
      }));
    } catch (error) {
      console.error("err", error);
    }
  }
  useEffect(() => {
    if (!selectedOpportunityId) {
      setFormData((prev) => ({
        ...prev,
        opportunity_dict: opportunities[0].id,
      }));
      setSelectedOpportunity(opportunities[0].id);
    }
  }, [opportunities]);
  useEffect(() => {
    if (selectedOpportunity) {
      setCandletickFormData((prev) => ({
        timeframe: selectedOpportunity?.timeframe,
        ticker: selectedOpportunity?.ticker,
      }));
    }
  }, [selectedOpportunity]);
  useEffect(() => {
    if (selectedOpportunityId) {
      getPerformance();
      retrieveOpportunity();
    }
  }, [selectedOpportunityId, refreshState]);
  useEffect(() => {
    if (candlestickFormData.ticker && candlestickFormData.timeframe) {
      getCandlestickCharData();
    }
  }, [candlestickFormData]);
  useEffect(() => {
    if (Object.keys(selectedOpportunity).length > 0 && !selectedOpportunityId) {
      const opportunity = selectedOpportunity;
      const pivotTimestamp = parseInt(opportunity.pivot_timestamp);
      const anchorTimestamp = parseInt(opportunity.anchor_timestamp);

      setAnnotationsData({
        pivotTimestamp,
        anchorTimestamp,
        yRange: opportunity?.yrange,
        buyZoneData: opportunity?.buy_zone
          ? [
              {
                x1: pivotTimestamp,
                y1: opportunity?.buy_zone[0],
                y2: opportunity?.buy_zone[1],
              },
            ]
          : [],
        stopLossData: [
          {
            x1: anchorTimestamp,

            y: opportunity?.stop_loss,
          },
        ],
        targetLevels: opportunity?.target_levels
          ? opportunity?.target_levels?.map((e) => ({
              x1: pivotTimestamp,
              y: e[1],
              name: e[0],
            }))
          : [],
        anchorSupport: opportunity?.resistances_broken
          ? opportunity?.resistances_broken?.map((e) => ({
              x2: anchorTimestamp,
              y: e[1],
              name: e[0],
            }))
          : [],
        anchorSrLod: opportunity?.anchor_sr_lod
          ? opportunity?.anchor_sr_lod?.map((e) => ({
              x2: anchorTimestamp,
              y: e?.sr,
              name: e.name,
            }))
          : [],
      });
    }
  }, [selectedOpportunity]);

  useEffect(() => {
    if (opportunities.length > 0) {
      setCalculateRiskData({
        stop_loss: opportunities[0].id.stop_loss,
        target_level: opportunities[0].id.pivot,
        current_price: opportunities[0].id.current_price,
      });
      setFindApi(0);
    } else {
      setFindApi(1);
    }
  }, [opportunities, selectedOpportunity]);

  useEffect(() => {
    sessionStorage.removeItem("tradeData");
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center flex-1">
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
        <div className="relative w-full h-full">
          <CalculateRiskModal
            data={calculateRiskData}
            show={showRiskModal}
            onSave={() => {}}
            onClose={() => setShowRiskModal(false)}
            formData={calculateRiskData}
            setFormData={setCalculateRiskData}
          />
          <div className="flex justify-between relative">
            {!selectedOpportunityId && selectedOpportunity.trackable && (
              <Selector
                width="30%"
                note="withid"
                data={opportunities}
                setSelected={handleInputChange}
                name={"opportunity_dict"}
                placeholder={"Opportunity 1"}
              />
            )}
            {findApi == 0 && (
              <ul className="my-3 pl-5 border p-3 rounded-md w-fit absolute right-0 -top-3 bg-gray-100">
                {opportunities?.length > 0 &&
                  opportunities[0]?.id &&
                  opportunities[0]?.id?.description?.length > 0 &&
                  opportunities[0]?.id?.description?.map((item) => (
                    <li className="text-xs list-disc">{item}</li>
                  ))}
              </ul>
            )}
          </div>
          {!selectedOpportunityId && !selectedOpportunity.trackable && (
            <h1 className="text-left text-sm border p-2 w-fit rounded-md">
              No Trade Setup Found
            </h1>
          )}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-x-3">
              <RadioBtnGrup
                name="timeframe"
                selected={candlestickFormData.timeframe}
                setSelected={handleRadioGrup}
                width="w-[14rem]"
              />
            </div>

            {performanceData?.panel && performanceData?.panel?.length > 0 && (
              <div className="flex">
                <div className="mr-5">
                  <PerformanceContainer
                    panel={performanceData?.panel}
                    color={performanceData.color}
                  />
                </div>

                <Tooltip
                  color="white"
                  title={
                    <ul className="space-y-1 text-xs list-disc list-inside">
                      <li className="text-[#ef4444]">Stop Loss</li>
                      <li className="text-[#22c55e]">
                        Targets that have already been visited
                      </li>
                      <li className="text-[#000000]">Current Price</li>
                      <li className="text-[#808080]">Next Target</li>
                    </ul>
                  }
                >
                  <BsQuestionCircleFill />
                </Tooltip>
                {/* <TooltipWrapper hoverMsg={<>
                  <p className="text-[#ef4444]">Stop Loss</p>
                  <p className="text-[#22c55e]">Prices that have already been visited</p>
                  <p className="text-[#000000]">Current Price</p>
                  <p className="text-[#808080]">Next Target</p>
                </>}>
                </TooltipWrapper> */}
              </div>
            )}
          </div>
          {((selectedOpportunity.trackable && findApi != 1) ||
            selectedOpportunity.tracking) && (
            <button
              disabled={!selectedOpportunity?.trackable}
              onClick={() =>
                selectedOpportunity.tracking
                  ? showConfirmation(
                      "This action cannot be undone. Do you want to proceed?",
                      handleUntrack
                    )
                  : handleTrack()
              }
              className="text-sm disabled:bg-slate-500 bg-[#1F2937] text-white font-medium  py-2 px-7 rounded-md shadow active:scale-95 transition transform duration-150 float-right right-0 top-40 absolute"
            >
              {selectedOpportunity.tracking ? "Untrack" : "Track"}
            </button>
          )}

          <div className="flex flex-col justify-center items-center mt-14 ">
            {retrieveSelectedOpportunityData?.risk?.level && (
              <p className="text-sm ml-auto mb-2">
                Risk Level:{" "}
                <span
                  style={{
                    color:
                      riskColorMap[
                        retrieveSelectedOpportunityData?.risk?.level.toLowerCase()
                      ],
                  }}
                  className="font-semibold uppercase"
                >
                  {" "}
                  {retrieveSelectedOpportunityData?.risk?.level}
                </span>
              </p>
            )}

            <div className="w-full  static mt-10 ">
              <CandlestickChart2
                withTIme={candlestickFormData.timeframe != "1d"}
                name={selectedOpportunity?.ticker}
                candlestickData={candlestickData}
                annotationsData={annotationsData}
              />
            </div>
          </div>
          {((selectedOpportunity.trackable && findApi != 1) ||
            selectedOpportunity.tracking) && (
            <div className="flex flex-col items-center justify-center gap-y-5 w-full h-fit my-[3rem]">
              {/* {!selectedOpportunity.tracking && (
                <div className="flex gap-x-2">
                  <CheckboxCom
                    selected={formData}
                    name="use_advanced_entry"
                    setSelected={setFormData}
                  />
          
                  <Tooltip title="If selected, we send you a notification when price changes trend on a 1m timeframe inside the buy zone. This may provide a better entry, but this is not a guarantee.">
                    <BsQuestionCircleFill className="text-slate-700" />
                  </Tooltip>
                </div>
              )} */}

              {/* <button
                disabled={!selectedOpportunity?.trackable}
                onClick={() =>
                  selectedOpportunity.tracking
                    ? showConfirmation(
                        "This action cannot be undone. Do you want to proceed?",
                        handleUntrack
                      )
                    : handleTrack()
                }
                className="text-sm disabled:bg-slate-500 bg-[#1F2937] text-white font-medium  py-2 px-7 rounded-md shadow active:scale-95 transition transform duration-150"
              >
                {selectedOpportunity.tracking ? "Untrack" : "Track"}
              </button> */}
            </div>
          )}
          {Object.keys(retrieveSelectedOpportunityData).length > 0 && (
            <div className=" my-5 mt-[5rem] flex flex-col items-center bg-white p-5 rounded-md shadow-sm ">
              <h1 className="text-xl">Past Activity</h1>
              <div className="mt-10 flex justify-center  w-full">
                {loading ? (
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
                  <PastActivity
                    data={retrieveSelectedOpportunityData?.messages?.map(
                      (activity) => ({
                        label: (
                          <p className="whitespace-nowrap">
                            {activity.date.split(" ").map((item, idx) => (
                              <p
                                style={
                                  idx == 1
                                    ? { fontSize: "12px" }
                                    : { fontWeight: "600" }
                                }
                              >
                                {item}
                              </p>
                            ))}
                          </p>
                        ),
                        children: activity.activity,
                      })
                    )}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default GraphScreen;
