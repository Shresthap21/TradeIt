import axiosPrivate from "@/axios/axiosPrivate";
import CandlestickChart2 from "@/components/CandlestickChart2";
import { Layout } from "@/components/Layout";
import { Table, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";

const BreakoutStrategy = () => {
  const [breakoutData, setBreakoutData] = useState([]);
  const [candlestickData, setCandlestickData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [tracking, setTracking] = useState(false);
  const [annotationsData, setAnnotationsData] = useState({
    buyZoneData: [],
    stopLossData: [],
    targetLevels: [],
    anchorSupport: [],
  });
  const [loading, setLoading] = useState(true);
  const columns = [
    {
      title: "Ticker",
      dataIndex: "ticker",
      key: "ticker",
    },
    {
      title: "Entry Price",
      dataIndex: "entry_price",
      key: "entry_price",
    },
    {
      title: "Stop Loss",
      dataIndex: "stop_loss",
      key: "stop_loss",
    },
    {
      title: "Date Added",
      dataIndex: "date_added",
      key: "date_added",
    },
  ];

  const getBreakoutStrategy = async () => {
    try {
      setLoading(true);
      const res = await axiosPrivate.get("/get_breakout_c_strategy");

      setBreakoutData(res.data.trade_list);
      setTracking(res.data.tracking);
    } catch (error) {
      console.error("ERR::GET::BREAKOUT-STRATEGY", error);
    } finally {
      setLoading(false);
    }
  };

  const getCandleStickData = async (data) => {
    try {
      setLoading(true);
      const res = await axiosPrivate.post("/get_candlestick_chart", data);

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
      console.error("ERR::GET::CANDLEDATA", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (record) => {
    setModalTitle(record.ticker);
    getCandleStickData({ ticker: record.ticker, timeframe: "1d" });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const toggleTrack = async () => {
    try {
      const url = tracking
        ? "/untrack_breakout_c_strategy"
        : "/track_breakout_c_strategy";
      const res = await axiosPrivate.get(url);
      console.log(res)
      if (res.status === 200) {
        toast.info(res.data.msg);
        setTracking((prev) => !prev);
      }
      console.log(res);
    } catch (error) {
      console.error("ERR::TOGGLE_TRACK", error);
    }
  };

  useEffect(() => {
    getBreakoutStrategy();
  }, []);

  return (
    <Layout>
      <div className="w-full">
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
            <button
              onClick={toggleTrack}
              className="text-sm float-right mb-2 disabled:bg-slate-500 bg-[#1F2937] text-white font-medium  py-2 px-7 rounded-md shadow active:scale-95 transition transform duration-150 w-fit"
            >
              {tracking ? "Untrack" : "Track"}
            </button>
            <Table
              className="w-full h-full no-scrollbar overflow-x-scroll bg-white border rounded-md p-2"
              columns={columns}
              dataSource={breakoutData}
              rowKey="id_"
              pagination={{
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total) => `Total ${total} items`,
              }}
              onRow={(record) => ({
                onClick: () => {
                  handleRowClick(record);
                },
                className: "cursor-pointer",
              })}
            />
          </>
        )}
        <Modal
          loading={loading}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          width="80%"
        >
          <CandlestickChart2
            name={modalTitle}
            enableAnnotation={false}
            candlestickData={candlestickData}
            annotationsData={annotationsData}
          />
        </Modal>
      </div>
    </Layout>
  );
};

export default BreakoutStrategy;
