import React, { useEffect, useState } from "react";
import { Table, Tooltip, Button } from "antd";
import axiosPrivate from "@/axios/axiosPrivate";
import { Layout } from "@/components/Layout";
import { Oval } from "react-loader-spinner";
import { BsQuestionCircleFill } from "react-icons/bs";
import { MdOutlineTab } from "react-icons/md";
import { CiSearch } from "react-icons/ci";

const Watchlist = ({ handleRowClick, newTab }) => {
  const [watchlistData, setWatchlistData] = useState([]);
  const [loading, setLoading] = useState(false);

  const filters = {
    active: ["True", "False"],
    sector: [
      "Energy",
      "Financials",
      "Utilities",
      "Industrials",
      "Technology",
      "Healthcare",
      "Consumer Discretionary",
      "Consumer Staples",
      "Materials",
      "Real Estate",
      "Communication Services",
      "Others",
    ],
    timeframe: ["15m", "1d"],
  };

  const generateFilters = (data, key) => {
    return [...new Set(data.map((item) => item[key]))]
      .filter((value) => value != null)
      .map((value) => ({
        text: value.toString(),
        value: value.toString(),
      }));
  };

  const columns = [
    {
      title: "Ticker",
      dataIndex: "Ticker",
      sorter: (a, b) => a.Ticker.localeCompare(b.Ticker),
      filterSearch: true,
      onFilter: (value, record) =>
        record.Ticker.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Name",
      dataIndex: "Name",
      sorter: (a, b) => a.Name.localeCompare(b.Name),
      filterSearch: true,
      onFilter: (value, record) =>
        record.Name.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Sector",
      dataIndex: "Sector",
      filters: generateFilters(watchlistData, "Sector"),
      filterSearch: true,
      onFilter: (value, record) => record.Sector === value,
    },
    {
      title: (
        <span className="flex gap-x-2 items-center">
          Count{" "}
          <Tooltip title="Number of trade setups found in this sector">
            <BsQuestionCircleFill />
          </Tooltip>
        </span>
      ),
      dataIndex: "Count",
      sorter: (a, b) => parseFloat(a["Count"]) - parseFloat(b["Count"]),
    },
    {
      title: (
        <span className="flex gap-x-2 items-center">
          Timeframe{" "}
          <Tooltip title="The timeframe (15m, 1d) on which this trade setup has formed.">
            <BsQuestionCircleFill />
          </Tooltip>
        </span>
      ),
      dataIndex: "Timeframe",
      filters: generateFilters(watchlistData, "Timeframe"),
      onFilter: (value, record) => record.Timeframe === value,
    },
    {
      title: "Avg Volume",
      dataIndex: "Average Volume",
    },
    {
      title: "PE Ratio",
      dataIndex: "PE Ratio",
      sorter: (a, b) => parseFloat(a["PE Ratio"]) - parseFloat(b["PE Ratio"]),
    },
    {
      title: "Shares Outstanding",
      dataIndex: "Shares Outstanding",
    },
    {
      title: "Market Cap",
      dataIndex: "Market Cap",
    },
    {
      title: (
        <span className="flex gap-x-2 items-center">
          Status{" "}
          <Tooltip title="Active setups are those where price is currently in the buy zone">
            <BsQuestionCircleFill />
          </Tooltip>
        </span>
      ),
      dataIndex: "Status",
      filters: [{ text: "Buyzone", value: "Buyzone" }],
      onFilter: (value, record) => record.Status === value,
      render: (status) => (
        <span
          style={{
            color: status === "Buyzone" ? "green" : "red",
            fontWeight: "bold",
          }}
        >
          {status}
        </span>
      ),
    },
    {
      title: "",
      dataIndex: "action",
      render: (_, record) => (
        <Button
          title="New Tab"
          onClick={(e) => {
            e.stopPropagation();
            newTab(record);
          }}
        >
          <MdOutlineTab />
        </Button>
      ),
    },
  ];

  async function getWatchlistData() {
    try {
      setLoading(true);
      const res = await axiosPrivate.get("/get_trade_watchlist");
      const data = res?.data?.watchlist || [];
      console.log("RESPONSE: ", res);
      setWatchlistData(data.map((e, index) => ({ ...e, key: index })));
    } catch (error) {
      console.error("ERR::", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getWatchlistData();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = watchlistData.filter(
    (item) =>
      item.Ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <>
          <div className="flex mb-4 gap-x-4">
            <h1 className="text-left text-sm border p-2 w-fit rounded-md bg-white">
              Bullish Trade Setups
            </h1>
            <div className="relative flex justify-center items-center">
              <input
                type="text"
                className="text-sm border p-2 pl-8 rounded-md focus:outline-none"
                value={searchQuery}
                onChange={handleSearch}
              />
              <CiSearch size={20} className="absolute left-2" />
            </div>
          </div>
          <Table
            className="w-full h-full no-scrollbar overflow-x-scroll bg-white border rounded-md p-2"
            columns={columns}
            dataSource={filteredData}
            rowKey="_id"
            pagination={{
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total) => `Total ${total} items`,
            }}
            onRow={(record) => ({
              onClick: () => {
                console.log("record", record);
                handleRowClick(record);
              },
              className: "cursor-pointer",
            })}
          />
        </>
      )}
    </>
  );
};

export default Watchlist;
