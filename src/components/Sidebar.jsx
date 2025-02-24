import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RxPlus, RxDotsHorizontal } from "react-icons/rx";
import Popup from "./Popup";
import axiosPrivate from "@/axios/axiosPrivate";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { useDashboardContext } from "@/lib/context/DashboardContext";
import { Oval } from "react-loader-spinner";
import { useConfirmation } from "@/lib/context/ConfirmationContext";
import FeedbackModal from "./FeedbackModal";
import { toast } from "react-toastify";

const Sidebar = () => {
  const navigate = useNavigate();
  const [allTrackedOpportunities, setAllTrackedOpportunities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackFormData, setFeedbackFormData] = useState({
    subject: "",
    message: "",
  });

  const ITEMS_PER_PAGE = 10;

  const {
    refreshState,
    toggleRefreshState,
    setPageState,
    selectedOpportunityId,
    setSelectedOpportunityId,
    setSelectedOpportunity,
  } = useDashboardContext();
  const [formData, setFormData] = useState({
    opportunity_id: "",
    opportunity_name: "",
    stop_loss: "",
    notify_user: false,
  });
  const { showConfirmation } = useConfirmation();
  function manageEdit(opportunity) {
    setFormData({
      opportunity_id: opportunity.opportunity_id,
      opportunity_name: opportunity.misc_info.opportunity_name || "",
      stop_loss: opportunity.misc_info.stop_loss || "",
      notify_user: opportunity.misc_info.notify_user || false,
    });
    setShowModal(true);
  }

  async function manageDelete(opportunity) {
    try {
      // setLoading(true);

      const res = await axiosPrivate.post("/delete_opportunity", {
        opportunity_id: opportunity.opportunity_id,
      });
      if (res.status === 200) {
        if (opportunity.opportunity_id === selectedOpportunityId) {
          setSelectedOpportunityId("");
          setSelectedOpportunity({});
          setPageState(0);
        }
        toggleRefreshState();
      }
    } catch (error) {
      console.error("ERR::POST::EDIT", error);
    } finally {
      setLoading(false);
    }
  }

  const popupItem = (opportunity) => [
    {
      icon: <FiEdit2 size={20} />,
      label: "Edit",
      func: (e) =>{
        e.stopPropagation();
        manageEdit(opportunity)},
    },
    {
      icon: <AiOutlineDelete color="#ef4444 " size={20} />,
      label: <span className="text-red-500">Delete</span>,
      func: (e) =>{
        e.stopPropagation();

        showConfirmation(
          "This action cannot be undone. Do you want to proceed?",
          () => manageDelete(opportunity)
        )}
    },
  ];

  async function fetchTrackedOpportunities(task) {
    try {
      setLoading(true);
      const from = page * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE;

      const res = await axiosPrivate.get(
        `/list_tracked_opportunities?from=${from}&to=${to}`
      );
      if (res.status === 200) {
        const newOpportunities = res?.data?.tracked_opportunities || [];

        // Deduplicate data
        setAllTrackedOpportunities(
          task == "refresh"
            ? newOpportunities
            : (prev) => {
                const existingIds = new Set(
                  prev.map((opportunity) => opportunity.opportunity_id)
                );
                const uniqueNewOpportunities = newOpportunities.filter(
                  (opportunity) => !existingIds.has(opportunity.opportunity_id)
                );
                return [...prev, ...uniqueNewOpportunities];
              }
        );
        setHasMore(newOpportunities.length === ITEMS_PER_PAGE);
      }
    } catch (error) {
      console.error("Error fetching opportunities", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      fetchTrackedOpportunities();
    }, 60000); 

    return () => clearInterval(interval);
  }, []);

  function handleLoadMore() {
    setPage((prev) => prev + 1);
  }

  useEffect(() => {
    setPage(0);
    fetchTrackedOpportunities();
  }, [page]);

  useEffect(() => {
    fetchTrackedOpportunities("refresh");
  }, [refreshState]);

  async function handleEdit() {
    try {
      setLoading(true);

      const res = await axiosPrivate.post("/edit_opportunity", formData);
      if (res.status === 200) {
        toggleRefreshState();
      }
    } catch (error) {
      console.error("ERR::POST::EDIT", error);
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  }

  function handleOpportunityClick(opportunity) {
    setSelectedOpportunity({ ...opportunity, trackable: true });
    setSelectedOpportunityId(opportunity?.opportunity_id);
    setPageState(1);
  }

  const colorDirectionMap = {
    false: "#a6a6a6",
    true: "#22c55e",
  };

  function reset() {
    setSelectedOpportunity({});
    setSelectedOpportunityId("");
    setPageState(0);
  }

  async function handleFeedbackSubmit() {
    try {
      const res = await axiosPrivate.post("/feedback", feedbackFormData);
      if (res.status === 200) {
        toast.success(res.data?.msg);
        setShowFeedbackModal(false);
        setFeedbackFormData({
          subject: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("err", error);
    }
  }

  return (
    <>
      <Modal
        show={showModal}
        onSave={handleEdit}
        onClose={() => setShowModal(false)}
        formData={formData}
        setFormData={setFormData}
      />

      <FeedbackModal
        show={showFeedbackModal}
        onSave={handleFeedbackSubmit}
        onClose={() => setShowFeedbackModal(false)}
        formData={feedbackFormData}
        setFormData={setFeedbackFormData}
      />

      <div className="space-y-5 bg-[#1F2937] w-[19rem] font-semibold h-screen shadow relative">
        <div className="flex justify-between items-center px-4 pt-4">
          <p className="text-white text-xl font-400">Your Trades</p>
     
        </div>
        <hr className="border-slate-400" />
        {loading ? (
          <div className="flex justify-center pt-4">
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
          <div className="space-y-3 h-[82%] overflow-y-scroll  no-scrollbar px-4 py-4">
            {allTrackedOpportunities.map((e, index) => (
              <div
                onClick={() => {
                  let updatedOpportunity = allTrackedOpportunities;
                  updatedOpportunity[index].read_by_user = true;
                  setAllTrackedOpportunities(updatedOpportunity);
                  handleOpportunityClick(e);
                }}
                key={e.opportunity_id}
                className={`bg-slate-700 ${
                  e.opportunity_id === selectedOpportunityId
                    ? "ring-2 ring-yellow-400"
                    : "ring-0"
                } p-3 flex justify-between relative items-center text-white font-normal rounded-md text-sm cursor-pointer`}
              >
                {!e?.read_by_user && (
                  <span className="absolute h-3 w-3 bg-blue-500 rounded-full -right-1 -top-1"></span>
                )}
                <span
                  style={{ backgroundColor: colorDirectionMap[e?.tracking] }}
                  className="h-3 w-3 rounded-full"
                ></span>
                <p
                  title={e?.misc_info?.opportunity_name}
                  className="truncate w-[8rem]"
                >
                  {e?.misc_info?.opportunity_name}
                </p>

                <Popup data={popupItem(e)}>
                  <RxDotsHorizontal className="text-white text-lg cursor-pointer" />
                </Popup>
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
          </div>
        )}

        <div className="px-4">
          <button
            onClick={() => setShowFeedbackModal(true)}
            className="text-white text-xs font-light p-2 rounded cursor-pointer border w-full"
          >
            Give Feedback
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
